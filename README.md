# Huashu Design Gallery

A browsable gallery of the 20 design philosophies shipped in [`alchaincyf/huashu-design`](https://github.com/alchaincyf/huashu-design) (⭐ 2,699) — with one-click **copy prompt DNA** to paste straight into Claude Code, OpenClaw, or any coding agent. Bilingual CN/EN captions, five schools, 20 philosophies, plus live iframes of the 9 capability demos bundled with the source skill.

**Live URL:** https://mvp.trollefsen.com/2026-04-21-huashu-design-gallery/

**Inspired by:** [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design)

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4

## Features

- 20 philosophy cards grouped into 5 schools (Information Architecture, Motion Poetics, Minimalism, Experimental Avant-garde, Eastern Philosophy)
- Each card: bilingual CN/EN tagline + features, custom CSS style swatch, scene-fit scores (web / ppt / pdf / infographic / cover), best execution path (HTML / AI / Hybrid)
- One-click **copy prompt DNA** button — pastes a Claude Code-ready style prompt into the clipboard
- Filter bar: language toggle (CN / EN / Both), best-for-scene filter, execution-path filter
- Live iframes of the 9 capability demos from the source repo (iOS prototype, slides-to-PPTX, motion design, tweaks, infographic, expert review, brand protocol, junior designer, fallback advisor)
- Household "tried by" tag strip per philosophy (extensible for multi-agent use)
- Build-time parser extracts structured data from upstream `design-styles.md` — upstream schema changes only require `npm run prebuild`

---

*Built as part of the [Nightly MVP](https://mvp.trollefsen.com) series.*
