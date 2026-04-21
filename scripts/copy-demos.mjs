#!/usr/bin/env node
// Copy the 9 capability demos from the source repo into public/demos/ so
// we can iframe them live at /demos/{id}.html (no remote fetch).

import { readdirSync, copyFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = resolve(__dirname, "../vendor/huashu-design/demos");
const OUT_DIR = resolve(__dirname, "../public/demos");

mkdirSync(OUT_DIR, { recursive: true });

const files = readdirSync(SRC_DIR).filter((f) => f.endsWith(".html"));
for (const f of files) {
  copyFileSync(resolve(SRC_DIR, f), resolve(OUT_DIR, f));
}
console.log(`✓ Copied ${files.length} demo HTML files → public/demos/`);
