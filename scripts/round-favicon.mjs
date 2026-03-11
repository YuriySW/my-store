import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public/images/favicon.png");
const output = path.join(root, "public/images/favicon-round.png");

const meta = await sharp(input).metadata();
const size = Math.min(meta.width ?? 256, meta.height ?? 256);
const r = size / 2;
const circleSvg = `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="white"/></svg>`;

await sharp(input)
  .resize(size, size)
  .composite([{ input: Buffer.from(circleSvg), blend: "dest-in" }])
  .png()
  .toFile(output);

fs.renameSync(output, input);
console.log("Favicon обрезан по кругу:", input);
