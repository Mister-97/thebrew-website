/**
 * Generates the warm placeholder art that stands in for real photography.
 * Run: node scripts/make-placeholders.mjs
 * Delete this script (and public/images/*.svg) once real photos land.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images");
mkdirSync(OUT, { recursive: true });

const palettes = [
  ["#f6e9d2", "#ffa344"],
  ["#efdcbd", "#ee3629"],
  ["#f6e9d2", "#c3abc6"],
  ["#ffa344", "#ee3629"],
];

const svg = (w, h, [from, to], label, seed) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${seed}"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" filter="url(#n)" opacity="0.14"/>
  <circle cx="${w * 0.5}" cy="${h * 0.46}" r="${Math.min(w, h) * 0.17}" fill="none" stroke="#1b1613" stroke-opacity="0.28" stroke-width="${Math.min(w, h) * 0.012}"/>
  <path d="M ${w * 0.5 + Math.min(w, h) * 0.17} ${h * 0.42} q ${Math.min(w, h) * 0.09} ${Math.min(w, h) * 0.05} 0 ${Math.min(w, h) * 0.1}" fill="none" stroke="#1b1613" stroke-opacity="0.28" stroke-width="${Math.min(w, h) * 0.012}"/>
  <text x="${w * 0.5}" y="${h * 0.72}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.055}" fill="#1b1613" fill-opacity="0.5">${label}</text>
</svg>`;

const files = [
  ["hero", 900, 900, "photo to come"],
  ["about", 900, 900, "regulars"],
  ["welcome", 1400, 1050, "the room"],
  ["feature-coffee", 1200, 900, "espresso"],
  ["feature-food", 1200, 900, "kitchen"],
  ["feature-lunch", 1200, 900, "lunch"],
  ["feature-room", 1200, 900, "the room"],
  ["gallery-1", 900, 1200, "gallery"],
  ["gallery-2", 900, 900, "gallery"],
  ["gallery-3", 900, 900, "gallery"],
  ["gallery-4", 900, 900, "gallery"],
  ["gallery-5", 900, 900, "gallery"],
];

files.forEach(([name, w, h, label], i) => {
  writeFileSync(
    join(OUT, `${name}.svg`),
    svg(w, h, palettes[i % palettes.length], label, i + 1),
  );
});

console.log(`Wrote ${files.length} placeholders to public/images/`);
