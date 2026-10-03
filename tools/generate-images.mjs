// Recorta y optimiza las imágenes originales de assets/source en assets/images.
// next/image genera después los tamaños responsive a partir de estos ficheros.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDir = path.join(root, 'assets', 'source');
const outputDir = path.join(root, 'assets', 'images');

// Las originales miden 1536x1024. Las regiones se expresan en esos píxeles.
const jobs = [
  // Hero: se quita el rótulo de la parte superior y el texto inferior; quedan los dos coches.
  { input: 'presentation.png', output: 'hero.webp', region: { left: 0, top: 430, width: 1536, height: 470 } },
  // Modelos: recorte 4:3 centrado en el coche.
  { input: 'STORM-XR.png', output: 'storm-xr.webp', region: { left: 88, top: 0, width: 1365, height: 1024 } },
  {
    input: 'FLASH-R1.png',
    output: 'flash-r1.webp',
    region: { left: 120, top: 0, width: 1365, height: 1024 },
  },
  {
    input: 'TITAN-PRO.png',
    output: 'titan-pro.webp',
    region: { left: 60, top: 0, width: 1365, height: 1024 },
  },
];

await fs.mkdir(outputDir, { recursive: true });

for (const job of jobs) {
  const outputPath = path.join(outputDir, job.output);
  const info = await sharp(path.join(sourceDir, job.input))
    .extract(job.region)
    .webp({ quality: 82, effort: 6 })
    .toFile(outputPath);
  console.log(`${job.output}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`);
}
