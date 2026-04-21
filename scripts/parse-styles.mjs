#!/usr/bin/env node
// Parse the upstream design-styles.md into a typed JSON array of philosophies.
// Source: vendor/huashu-design/references/design-styles.md
// Output: src/data/philosophies.json

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../vendor/huashu-design/references/design-styles.md");
const OUT = resolve(__dirname, "../src/data/philosophies.json");

const SCHOOLS = [
  { key: "information", zh: "信息建筑派", en: "Information Architecture", range: [1, 4] },
  { key: "motion", zh: "运动诗学派", en: "Motion Poetics", range: [5, 8] },
  { key: "minimalism", zh: "极简主义派", en: "Minimalism", range: [9, 12] },
  { key: "experimental", zh: "实验先锋派", en: "Experimental Avant-garde", range: [13, 16] },
  { key: "eastern", zh: "东方哲学派", en: "Eastern Philosophy", range: [17, 20] },
];

function schoolForNumber(n) {
  return SCHOOLS.find((s) => n >= s.range[0] && n <= s.range[1]);
}

const md = readFileSync(SRC, "utf8");

// Parse scene-score table (the "速查表" at top) into a map keyed by number.
const tableMatch = md.match(/\|\s*风格[\s\S]+?(?=\n\n|\n>)/);
const scoreMap = {};
if (tableMatch) {
  const lines = tableMatch[0].split("\n").filter((l) => /^\|\s*\d{2}\s/.test(l));
  for (const line of lines) {
    const cells = line.split("|").map((s) => s.trim()).filter(Boolean);
    // [number+name, web, ppt, pdf, infographic, cover, ai, best_path]
    const [head, web, ppt, pdf, info, cover, ai, path] = cells;
    const num = parseInt(head.match(/\d+/)[0], 10);
    const stars = (s) => (s.match(/★/g) || []).length;
    scoreMap[num] = {
      scene_scores: {
        web: stars(web),
        ppt: stars(ppt),
        pdf: stars(pdf),
        infographic: stars(info),
        cover: stars(cover),
      },
      ai_generation_score: stars(ai),
      best_path: path, // "HTML" | "AI生成" | "混合"
    };
  }
}

// Split philosophies by headings of form: ### NN. Name - Studio风格 (or similar)
const items = [];
const philosophyRe = /^### (\d{2})\.\s+([^\n]+)$/gm;
const matches = [...md.matchAll(philosophyRe)];

for (let i = 0; i < matches.length; i++) {
  const m = matches[i];
  const num = parseInt(m[1], 10);
  const titleLine = m[2].trim();
  const start = m.index + m[0].length;
  const end = i + 1 < matches.length ? matches[i + 1].index : md.length;
  const body = md.slice(start, end);

  // Title format variants:
  //   "Pentagram - Michael Bierut风格"
  //   "Stamen Design - 数据诗学"
  //   "Zach Lieberman - 编程即绘画"
  const titleParts = titleLine.split(/\s*[-–—]\s*/);
  const name_en = titleParts[0].trim();
  const studio_or_subtitle = (titleParts.slice(1).join(" - ") || "").trim();

  // 哲学 line: **哲学**：...
  const philMatch = body.match(/\*\*哲学\*\*[：:]\s*([^\n]+)/);
  const philosophy_cn = philMatch ? philMatch[1].trim() : "";

  // 核心特征 block until next **field** or blank block
  const featMatch = body.match(/\*\*核心特征\*\*[：:]?\s*\n((?:-\s+[^\n]+\n?)+)/);
  const features_cn = featMatch
    ? featMatch[1]
        .split("\n")
        .map((l) => l.replace(/^-\s+/, "").trim())
        .filter(Boolean)
    : [];

  // 提示词DNA code block
  const dnaMatch = body.match(/\*\*提示词DNA\*\*[：:]?\s*\n```[a-z]*\n([\s\S]+?)```/);
  const prompt_dna = dnaMatch ? dnaMatch[1].trim() : "";

  // 代表作 line
  const repMatch = body.match(/\*\*代表作\*\*[：:]\s*([^\n]+)/);
  const rep_work = repMatch ? repMatch[1].trim() : "";

  // 搜索关键词
  const kwMatch = body.match(/\*\*搜索关键词\*\*[：:]\s*([^\n]+)/);
  const search_keywords = kwMatch ? kwMatch[1].trim() : "";

  const school = schoolForNumber(num);

  items.push({
    number: num,
    name_en,
    studio_or_subtitle,
    school_key: school.key,
    school_zh: school.zh,
    school_en: school.en,
    philosophy_cn,
    features_cn,
    prompt_dna,
    rep_work,
    search_keywords,
    ...(scoreMap[num] || { scene_scores: {}, ai_generation_score: 0, best_path: "" }),
  });
}

// Hand-authored English translations for the bilingual captions. The upstream
// doc is ~90% Chinese; generating EN via LLM at build time is overkill for an
// overnight MVP. We translate the philosophy taglines + features here once.
const EN_OVERRIDES = {
  1:  { philosophy_en: "Type is language; grid is thought.",
        features_en: ["Extreme color restraint (black + white + 1 brand color)",
                      "Modern interpretation of the Swiss grid system",
                      "Typography as the primary visual language",
                      "Strategic use of negative space (60%+ whitespace)"] },
  2:  { philosophy_en: "Let data become a touchable landscape.",
        features_en: ["Cartographic thinking applied to information design",
                      "Algorithm-generated organic forms",
                      "Warm data palette (terracotta, sage green, deep blues)",
                      "Layered, interactive information hierarchies"] },
  3:  { philosophy_en: "Design isn't decoration — it's the architecture of content.",
        features_en: ["Extreme content-hierarchy clarity",
                      "System fonts only (reading-optimized)",
                      "Strict adherence to the classic blue hyperlink",
                      "Performance is aesthetic"] },
  4:  { philosophy_en: "Every pixel must carry information.",
        features_en: ["Scientific-journal rigor, design elegance",
                      "Precise quantitative visualization",
                      "Cool, professional palette (grey, navy)",
                      "Annotation + citation systems as design"] },
  5:  { philosophy_en: "Scroll is the new narrative timeline.",
        features_en: ["Cinematic scroll-driven storytelling",
                      "Layered parallax with depth cues",
                      "Smooth, inertia-based transitions",
                      "Cursor interaction as performance"] },
  6:  { philosophy_en: "The browser is a stage for physical play.",
        features_en: ["WebGL + Three.js as primary canvas",
                      "Playful, tactile microinteractions",
                      "Bold gradient + fluorescent accents",
                      "Physics-driven motion"] },
  7:  { philosophy_en: "Generative systems produce the form — we set the rules.",
        features_en: ["Rules-based procedural output",
                      "Brand identity as a living system",
                      "Parameter-driven aesthetic variance",
                      "Code-native graphic design"] },
  8:  { philosophy_en: "The web as immersive theatre.",
        features_en: ["Full-screen cinematic WebGL scenes",
                      "Dense, surreal 3D choreography",
                      "Ambient audio + motion tight coupling",
                      "Experience over information"] },
  9:  { philosophy_en: "Form follows content; nothing else.",
        features_en: ["Radical removal of decorative noise",
                      "Bold typographic slabs as hero",
                      "Monochrome or duotone palettes",
                      "Every element justifies its presence"] },
  10: { philosophy_en: "The grid is mathematics — obey it.",
        features_en: ["Strict Swiss grid with modular proportions",
                      "Sans-serif (Helvetica / Akzidenz-Grotesk) dominance",
                      "Asymmetric balance through grid tension",
                      "Objective, functional clarity"] },
  11: { philosophy_en: "Typography is the identity.",
        features_en: ["Oversized display type as primary graphic",
                      "Punchy brand-color accents on mono grounds",
                      "Grid + type tension creates rhythm",
                      "Confident, editorial voice"] },
  12: { philosophy_en: "Style is expression; design is personality.",
        features_en: ["Hand-drawn and collage elements",
                      "Emotion-forward color choices",
                      "Personal narrative embedded in craft",
                      "Distinctly individual, distinctly human"] },
  13: { philosophy_en: "Code is drawing; drawing is thinking.",
        features_en: ["Realtime generative visuals",
                      "Poetic algorithmic gestures",
                      "Minimal palette, maximal motion vocabulary",
                      "Tools as expressive medium"] },
  14: { philosophy_en: "Loops are the grammar of motion.",
        features_en: ["Endless looping generative animations",
                      "Mathematical pattern exploration",
                      "Precise temporal rhythm",
                      "Textural, granular surfaces"] },
  15: { philosophy_en: "Darkness reveals structure.",
        features_en: ["Dark, volumetric compositions",
                      "Cinematic sci-fi palettes (deep blue, rust)",
                      "Complex 3D geometry as narrative",
                      "Atmospheric depth over flat clarity"] },
  16: { philosophy_en: "Design the fiction; ship the future.",
        features_en: ["Speculative interface aesthetics",
                      "Motion-graphics polish for UI",
                      "HUD vocabulary (data-dense overlays)",
                      "High-fidelity future-artifact realism"] },
  17: { philosophy_en: "Design thinking as cross-disciplinary inquiry.",
        features_en: ["Research-driven narrative design",
                      "Restrained, institutional palettes",
                      "Thoughtful typography with quiet authority",
                      "Data + story tightly interwoven"] },
  18: { philosophy_en: "Emptiness is the vessel for meaning.",
        features_en: ["Extreme whitespace as primary element",
                      "Pure, off-white grounds with subtle warmth",
                      "Minimal type, maximal breath",
                      "Serenity as visual stance"] },
  19: { philosophy_en: "The book is the design; the design is the book.",
        features_en: ["Print-native craft in every detail",
                      "Textural paper + edge + format play",
                      "Editorial rhythm over visual punch",
                      "Archive-quality, lasting artifacts"] },
  20: { philosophy_en: "Eastern restraint meets contemporary rigor.",
        features_en: ["Asian typographic harmony (CJK + Latin)",
                      "Warm ink-tone palettes",
                      "Meditative layout cadence",
                      "Modern-traditional tension in every mark"] },
};

for (const item of items) {
  const en = EN_OVERRIDES[item.number];
  if (en) Object.assign(item, en);
  else {
    item.philosophy_en = "";
    item.features_en = [];
  }
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(items, null, 2));
console.log(`✓ Parsed ${items.length} philosophies → ${OUT}`);
if (items.length !== 20) {
  console.error(`✗ Expected 20 philosophies, got ${items.length}`);
  process.exit(1);
}
