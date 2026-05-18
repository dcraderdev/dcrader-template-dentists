// Generate public/og-image.png (1200x630) for OG meta.
// Run: node scripts/gen-og.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'public', 'og-image.png');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B0C10"/>
      <stop offset="100%" stop-color="#12141C"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.55">
      <stop offset="0%" stop-color="#1A73E8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#1A73E8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.1" cy="0.9" r="0.5">
      <stop offset="0%" stop-color="#00C4B4" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#00C4B4" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Top pill -->
  <g transform="translate(80, 92)">
    <rect x="0" y="0" rx="999" ry="999" width="320" height="38" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="160" y="25" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" fill="#9CA3AF" text-anchor="middle" letter-spacing="2">DENTAL PRACTICE · 5 VARIANTS</text>
  </g>

  <!-- Tooth icon -->
  <g transform="translate(80, 168)">
    <rect width="76" height="76" rx="18" fill="#1A73E8"/>
    <path d="M22,34 Q18,22 30,16 Q38,12 38,18 Q38,12 46,16 Q58,22 54,34 L52,58 Q50,64 46,64 Q42,64 40,58 Q38,64 34,64 Q30,64 28,58 Z" fill="white"/>
  </g>

  <!-- Title -->
  <text x="80" y="340" font-family="'Playfair Display', Georgia, serif" font-size="84" font-weight="700" fill="#FFFFFF">Dental Template</text>
  <text x="80" y="430" font-family="'Playfair Display', Georgia, serif" font-size="84" font-weight="700" fill="#FFFFFF">Collection</text>

  <!-- Subtitle -->
  <text x="80" y="495" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="400" fill="#9CA3AF">Modern websites for dental practices.</text>

  <!-- Bottom row -->
  <g transform="translate(80, 560)">
    <text x="0" y="0" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="#6B7280" letter-spacing="2">ASTRO · TAILWIND · VERCEL</text>
  </g>
  <g transform="translate(1120, 560)">
    <text x="0" y="0" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="700" fill="#D1D5DB" text-anchor="end">dcrader.dev</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log('Wrote', out);
