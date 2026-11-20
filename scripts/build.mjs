import { build } from "esbuild";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const pkg = JSON.parse(readFileSync(resolve(rootDir, "package.json"), "utf8"));

mkdirSync(resolve(rootDir, "dist"), { recursive: true });

await build({
  entryPoints: [resolve(rootDir, "src/index.ts")],
  bundle: true,
  format: "esm",
  target: ["es2021"],
  minify: true,
  legalComments: "none",
  banner: {
    js: `/* Lucid Cards (直观卡片) v${pkg.version} | MIT License | https://github.com/kukushouhou/ha-lucid-cards */`,
  },
  define: {
    __LUCID_VERSION__: JSON.stringify(pkg.version),
  },
  outfile: resolve(rootDir, "dist/lucid-cards.js"),
});

console.log(`Built dist/lucid-cards.js (v${pkg.version})`);
