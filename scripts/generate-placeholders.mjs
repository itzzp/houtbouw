// Genereert eenvoudige, warme placeholder-afbeeldingen voor de site.
// Deze raster-JPG's worden door Astro's <Image>-component geoptimaliseerd.
// Vervang ze later door echte foto's met dezelfde bestandsnaam.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'src', 'assets', 'projecten');

// Warme houtbouw-tinten + dieprood (huisstijl) voor de placeholders.
const palette = ['#8a5a2b', '#6b4423', '#a9762f', '#9c6b3e', '#b01e17', '#7a4a24'];

/** @param {string} hex */
function darken(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 255) - 35);
  const g = Math.max(0, ((n >> 8) & 255) - 35);
  const b = Math.max(0, (n & 255) - 35);
  return `rgb(${r},${g},${b})`;
}

const images = [
  { file: 'houtskeletbouw-woning.jpg', label: 'Houtskeletbouw woning', color: palette[0] },
  { file: 'veranda-overkapping.jpg', label: 'Veranda / overkapping', color: palette[2] },
  { file: 'schuur.jpg', label: 'Houten schuur', color: palette[1] },
  { file: 'dakkapel.jpg', label: 'Dakkapel', color: palette[5] },
  { file: 'tuinkantoor.jpg', label: 'Tuinkantoor', color: palette[3] },
  { file: 'hero.jpg', label: 'Kloosterman bouw', color: palette[5] },
];

const W = 1200;
const H = 800;

await mkdir(outDir, { recursive: true });

for (const { file, label, color } of images) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${color}"/>
        <stop offset="100%" stop-color="${darken(color)}"/>
      </linearGradient>
      <pattern id="planks" width="${W}" height="64" patternUnits="userSpaceOnUse">
        <rect width="${W}" height="64" fill="none"/>
        <line x1="0" y1="63" x2="${W}" y2="63" stroke="rgba(0,0,0,0.12)" stroke-width="2"/>
      </pattern>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect width="${W}" height="${H}" fill="url(#planks)"/>
    <text x="50%" y="48%" font-family="Georgia, serif" font-size="56" font-weight="bold"
      fill="rgba(255,255,255,0.92)" text-anchor="middle">${label}</text>
    <text x="50%" y="56%" font-family="Georgia, serif" font-size="26"
      fill="rgba(255,255,255,0.7)" text-anchor="middle">foto volgt</text>
  </svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(join(outDir, file));
  console.log('geschreven:', file);
}
