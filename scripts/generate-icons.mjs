/**
 * DWSA Academy — PWA Icon Generator
 * Generates all required PWA icon sizes from a base SVG using sharp.
 * Run: node scripts/generate-icons.mjs
 */
import { createCanvas } from "canvas";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "icons");

mkdirSync(outDir, { recursive: true });

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  const cx = size / 2;
  const cy = size / 2;
  const pad = size * 0.08;

  // ── Background ────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, size, size);
  bg.addColorStop(0, "#061428");
  bg.addColorStop(1, "#030e1f");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  // ── Subtle grid lines ─────────────────────────────────────────
  const step = size / 8;
  ctx.strokeStyle = "rgba(0,210,255,0.06)";
  ctx.lineWidth = 0.5;
  for (let i = step; i < size; i += step) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
  }

  // ── Gold outer glow ring ──────────────────────────────────────
  const r = size * 0.38;
  const glow = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.1);
  glow.addColorStop(0, "rgba(212,160,23,0.18)");
  glow.addColorStop(1, "rgba(212,160,23,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy * 0.9, r * 1.1, 0, Math.PI * 2);
  ctx.fill();

  // ── Graduation Cap Icon ───────────────────────────────────────
  const capScale = size / 512;
  ctx.save();
  ctx.translate(cx, cy * 0.82);
  ctx.scale(capScale, capScale);

  // Board (diamond/rhombus)
  const bw = 200; // half-width of board
  const bh = 60;  // half-height
  const gold = ctx.createLinearGradient(-bw, -bh, bw, bh);
  gold.addColorStop(0, "#e5b520");
  gold.addColorStop(0.5, "#d4a017");
  gold.addColorStop(1, "#c8950f");

  ctx.beginPath();
  ctx.moveTo(0, -bh);
  ctx.lineTo(bw, 0);
  ctx.lineTo(0, bh);
  ctx.lineTo(-bw, 0);
  ctx.closePath();
  ctx.fillStyle = gold;
  ctx.fill();

  // Cap body (trapezoid)
  const tw = 170;
  const th = 110;
  ctx.beginPath();
  ctx.moveTo(-tw, 0);
  ctx.lineTo(tw, 0);
  ctx.lineTo(tw * 0.65, th);
  ctx.lineTo(-tw * 0.65, th);
  ctx.closePath();
  ctx.fillStyle = "#d4a017";
  ctx.fill();

  // Tassel cord
  ctx.beginPath();
  ctx.moveTo(bw, 0);
  ctx.lineTo(bw, 120);
  ctx.strokeStyle = "#d4a017";
  ctx.lineWidth = 10;
  ctx.stroke();

  // Tassel ball
  ctx.beginPath();
  ctx.arc(bw, 140, 18, 0, Math.PI * 2);
  ctx.fillStyle = "#00d2ff";
  ctx.fill();

  ctx.restore();

  // ── "DWSA" text ───────────────────────────────────────────────
  const fontSize = Math.max(size * 0.115, 10);
  ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // White text with cyan underline accent
  ctx.fillStyle = "#ffffff";
  ctx.fillText("DWSA", cx, cy * 1.55);

  // Thin cyan line under text
  const lineW = size * 0.35;
  const lineY = cy * 1.55 + fontSize * 0.65;
  const lineGrad = ctx.createLinearGradient(cx - lineW / 2, 0, cx + lineW / 2, 0);
  lineGrad.addColorStop(0, "transparent");
  lineGrad.addColorStop(0.5, "#00d2ff");
  lineGrad.addColorStop(1, "transparent");
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = Math.max(1.5, size * 0.008);
  ctx.beginPath();
  ctx.moveTo(cx - lineW / 2, lineY);
  ctx.lineTo(cx + lineW / 2, lineY);
  ctx.stroke();

  return canvas.toBuffer("image/png");
}

for (const size of sizes) {
  const buf = drawIcon(size);
  const outPath = join(outDir, `icon-${size}.png`);
  writeFileSync(outPath, buf);
  console.log(`✓ icon-${size}.png`);
}

console.log("\n✅ All DWSA PWA icons generated successfully!");
