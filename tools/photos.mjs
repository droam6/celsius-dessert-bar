// Turns the picked event photos into the web files the site uses.
//
//   node tools/photos.mjs "C:\Users\...\Desktop\celsius-photos\picks"
//
// The originals are NOT in this repo (it is public and some frames show faces).
// Each entry below says which original to read, how to crop it (fractions of the
// frame: left, top, width, height) and the alt text. Crops are chosen so no
// recognisable face is left in frame. Output: public/images/photos/*.webp and
// data/photos.json (sizes + alt), which the <Photo> component reads.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inDir = process.argv[2];
if (!inDir || !fs.existsSync(inDir)) {
  console.error('Give the folder that holds the picked originals.');
  process.exit(1);
}
const outDir = path.join(root, 'public/images/photos');
fs.mkdirSync(outDir, { recursive: true });

const WIDTHS = [480, 960, 1600];

const photos = [
  {
    id: 'pour',
    from: 'DSC08834',
    crop: [0.1, 0.585, 0.8, 0.415],
    alt: 'A gloved hand pours liquid nitrogen from a steel jug into a mixer bowl, fog spilling over the rim, beside a vase of roses',
  },
  {
    id: 'churn',
    from: 'DSC08864',
    alt: 'Gelato thickening in a steel mixer bowl as the paddle turns',
  },
  {
    id: 'cup',
    from: 'DSC09099',
    crop: [0, 0.1, 1, 0.9],
    alt: 'A scoop of gelato in a Celsius cup, topped with crushed pistachio and rose petals',
  },
  {
    id: 'fog-table',
    from: 'IMG_0730',
    crop: [0.18, 0.36, 0.82, 0.56],
    saturation: 0.8, // tames the yellow venue lighting
    alt: 'Three mixers on a linen-covered table at an evening event, nitrogen fog rolling across the table and over its edge',
  },
  {
    id: 'fog-plinth',
    from: 'IMG_8856',
    crop: [0.17, 0, 0.83, 1],
    alt: 'Nitrogen fog pouring off a round table around a mixer at an indoor event',
  },
  {
    id: 'harbour',
    from: 'IMG_8859',
    alt: 'The gelato bar set up on a terrace overlooking the Sydney Harbour Bridge and the Opera House',
  },
  {
    id: 'mirror-ball',
    from: 'IMG_9383',
    crop: [0, 0.08, 1, 0.84],
    alt: 'Three mixers and flasks of gelato base on a black table, lit by a mirror ball',
  },
  {
    id: 'kiosk',
    from: '_DSC0396',
    alt: 'A row of white mixers with nitrogen fog spilling from the bowls',
  },
];

const manifest = {};
for (const p of photos) {
  const file = fs.readdirSync(inDir).find((f) => f.startsWith(p.from));
  if (!file) {
    console.error(`MISSING original for ${p.id}: ${p.from}*`);
    process.exitCode = 1;
    continue;
  }
  let img = sharp(path.join(inDir, file)).rotate();
  const meta = await img.metadata();
  let w = meta.width;
  let h = meta.height;
  if (p.crop) {
    const [l, t, cw, ch] = p.crop;
    const box = {
      left: Math.round(l * w),
      top: Math.round(t * h),
      width: Math.round(cw * w),
      height: Math.round(ch * h),
    };
    img = img.extract(box);
    w = box.width;
    h = box.height;
  }
  if (p.saturation) img = img.modulate({ saturation: p.saturation });
  const base = await img.toBuffer();
  const sizes = WIDTHS.filter((x) => x < w);
  if (!sizes.length || w - sizes[sizes.length - 1] > 200) sizes.push(Math.min(w, 2000));
  const srcset = [];
  for (const sw of sizes) {
    const name = `${p.id}-${sw}.webp`;
    await sharp(base).resize({ width: sw }).webp({ quality: 80 }).toFile(path.join(outDir, name));
    srcset.push({ w: sw, src: `/images/photos/${name}` });
  }
  manifest[p.id] = { width: w, height: h, alt: p.alt, srcset };
  console.log(p.id.padEnd(12), `${w}x${h}`, sizes.join(', '));
}
fs.writeFileSync(path.join(root, 'data/photos.json'), JSON.stringify(manifest, null, 2) + '\n');
