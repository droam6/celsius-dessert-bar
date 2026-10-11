// Makes the metallic wordmark from the one-colour wordmark.
//
//   node tools/logo-metal.mjs
//
// Reads public/images/celsius-logo-mono.png (bone on transparent) and writes
// public/images/celsius-logo-metal.webp: the same shape filled with the site's metal
// (the stops below must match --metal in src/app/globals.css). The sheen is a soft
// light band across the lettering, not a second colour.
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const METALS = {
  // champagne silver: platinum body with a warm champagne shadow (the default)
  blend: ['#FFFDF7', '#DCD3C0', '#FFFFFF', '#B4AA97', '#F1EBDD', '#CEC5B2', '#FBF6EA'],
  platinum: ['#FFFFFF', '#D6D6D0', '#FFFFFF', '#ADADA6', '#EDEDE8', '#C8C8C2', '#F7F7F4'],
  champagne: ['#FFF6E0', '#DCC28F', '#FFFAEC', '#B89A62', '#F0DDB2', '#CDB07A', '#F8EACB'],
};
const AT = [0, 22, 38, 55, 72, 88, 100];

export async function metalLogo(stops, outFile) {
  const src = path.join(root, 'public/images/celsius-logo-mono.png');
  const { width, height } = await sharp(src).metadata();
  // Same angle as the CSS (100deg): mostly left to right, tilted a little downward.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><linearGradient id="m" gradientUnits="userSpaceOnUse" x1="0" y1="${height * 0.2}" x2="${width}" y2="${height * 0.8}">
      ${stops.map((c, i) => `<stop offset="${AT[i]}%" stop-color="${c}"/>`).join('')}
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#m)"/></svg>`;
  const alpha = await sharp(src).ensureAlpha().extractChannel(3).raw().toBuffer();
  const rgb = await sharp(Buffer.from(svg)).removeAlpha().raw().toBuffer();
  // Join the shape to the metal at full size first, then scale: 416px wide covers the
  // footer size at 3x, and WebP keeps the soft gradient small.
  const full = await sharp(rgb, { raw: { width, height, channels: 3 } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
  const img = sharp(full).resize({ width: 416 });
  await (outFile.endsWith('.webp') ? img.webp({ quality: 92, alphaQuality: 100 }) : img.png({ compressionLevel: 9 })).toFile(outFile);
  return { width, height };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const out = path.join(root, 'public/images/celsius-logo-metal.webp');
  const size = await metalLogo(METALS.blend, out);
  console.log('wrote', path.relative(root, out), size.width + 'x' + size.height);
}
