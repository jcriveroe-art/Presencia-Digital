const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const webDir = path.join(root, "www");
const crmDir = path.join(root, "crm");
const sourceAssets = path.join(crmDir, "assets");
const targetAssets = path.join(webDir, "assets");

fs.mkdirSync(webDir, { recursive: true });
fs.copyFileSync(path.join(crmDir, "index.html"), path.join(webDir, "index.html"));

if (fs.existsSync(sourceAssets)) {
  fs.cpSync(sourceAssets, targetAssets, { recursive: true });
}

console.log("Capacitor web bundle listo en www/index.html");
