import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const inputDir = path.join(rootDir, 'public', 'images');
const outputDir = path.join(rootDir, 'public', 'images', 'hero');

const files = [
  { key: 'presentation', input: 'presentation.png' },
  { key: 'storm-xr', input: 'STORM-XR.png' },
  { key: 'flash-r1', input: 'FLASH-R1.png' },
  { key: 'titan-pro', input: 'TITAN-PRO.png' }
];

const widths = [480, 768, 1200, 1600];

async function generateForFile(file) {
  const inputPath = path.join(inputDir, file.input);

  for (const width of widths) {
    const jpgOutput = path.join(outputDir, `${file.key}-${width}.jpg`);
    const webpOutput = path.join(outputDir, `${file.key}-${width}.webp`);

    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(jpgOutput);

    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(webpOutput);
  }
}

async function run() {
  await fs.mkdir(outputDir, { recursive: true });

  await Promise.all(files.map((file) => generateForFile(file)));

  console.log('Hero responsive images generated in public/images/hero');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
