#!/usr/bin/env node
// Generate responsive WebP + AVIF derivatives for /public/images/*
// - For each existing *.webp source, produce a matching *.avif (same size).
// - For HERO images (named *-hero.webp), also produce widths 320, 640, 1024, 1920 in both webp & avif.
// - For CARD images (named *-card.webp), also produce widths 320, 640, 1024 in both webp & avif.
// - For THUMB images (named *-thumb.webp), also produce widths 320, 640 in both webp & avif.

import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const dir = path.resolve('public/images');
const files = (await fs.readdir(dir)).filter((f) => /\.webp$/i.test(f) && !/-(\d+)\.webp$/.test(f));

const targetWidthsByKind = {
  hero: [320, 640, 1024, 1920],
  card: [320, 640, 1024],
  thumb: [320, 640],
};

const webpOpts = { quality: 78, effort: 4 };
const avifOpts = { quality: 50, effort: 4 };

let made = 0;
for (const f of files) {
  const src = path.join(dir, f);
  const base = f.replace(/\.webp$/i, '');
  const kind = base.endsWith('-hero') ? 'hero' : base.endsWith('-card') ? 'card' : base.endsWith('-thumb') ? 'thumb' : null;

  const meta = await sharp(src).metadata();
  const origW = meta.width || 0;

  // 1) Matching avif at native size
  const avifPath = path.join(dir, `${base}.avif`);
  try { await fs.access(avifPath); } catch {
    await sharp(src).avif(avifOpts).toFile(avifPath);
    made++;
  }

  if (!kind) continue;

  // Generate every declared target width so srcset references never 404,
  // even when source is smaller than target (upscale rather than skip).
  const widths = targetWidthsByKind[kind];
  for (const w of widths) {
    const webpOut = path.join(dir, `${base}-${w}.webp`);
    const avifOut = path.join(dir, `${base}-${w}.avif`);
    const resizeOpts = w > origW ? { width: w, withoutEnlargement: false } : { width: w };
    try { await fs.access(webpOut); } catch {
      await sharp(src).resize(resizeOpts).webp(webpOpts).toFile(webpOut);
      made++;
    }
    try { await fs.access(avifOut); } catch {
      await sharp(src).resize(resizeOpts).avif(avifOpts).toFile(avifOut);
      made++;
    }
  }
}

console.log(`Generated ${made} derivative(s).`);
