import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const theme = path.resolve(__dirname, "..");
const svgPath = path.join(theme, "static/brand/jsonxcel-mark.svg");
const svg = fs.readFileSync(svgPath);

function render(size, out) {
  const r = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  fs.writeFileSync(out, r.render().asPng());
}

const brand = path.join(theme, "static/brand");
const st = path.join(theme, "static");
render(512, path.join(brand, "jsonxcel-mark.png"));
render(180, path.join(st, "apple-touch-icon.png"));
render(192, path.join(st, "android-chrome-192x192.png"));
render(512, path.join(st, "android-chrome-512x512.png"));
render(32, path.join(st, "favicon-32x32.png"));
render(16, path.join(st, "favicon-16x16.png"));
fs.copyFileSync(svgPath, path.join(st, "favicon.svg"));
console.log("rasterized mark + favicons");
