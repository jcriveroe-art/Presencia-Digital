const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const assetsDir = path.join(rootDir, "assets");
const distAssetsDir = path.join(distDir, "assets");
const publicDir = path.join(rootDir, "public");

function copyDir(source, target) {
  if (!fs.existsSync(source)) return;
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.copyFileSync(path.join(rootDir, "index.html"), path.join(distDir, "index.html"));
copyDir(assetsDir, distAssetsDir);
copyDir(publicDir, distDir);

for (const fileName of [
  "hero_final.png",
  "hero-on-cafe.png",
  "influencer_demo.mp4",
  "influencer_promo.jpg.jpeg",
  "googlef4fe708948188d30.html",
  "metadata.json",
  "robots.txt",
  "sitemap.xml",
]) {
  const sourcePath = path.join(rootDir, fileName);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, path.join(distDir, fileName));
  }
}

console.log("Vercel bundle listo en dist/index.html");
