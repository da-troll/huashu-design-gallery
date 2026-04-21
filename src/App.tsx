import { useMemo, useState } from "react";
import philosophies from "./data/philosophies.json";
import type { Philosophy, Scene, SchoolKey } from "./types";
import { PhilosophyCard } from "./components/PhilosophyCard";
import { DemoStrip } from "./components/DemoStrip";

const SCHOOLS: { key: SchoolKey; en: string; blurb_en: string }[] = [
  { key: "information", en: "Information Architecture", blurb_en: "Data is not decoration — it's building material." },
  { key: "motion", en: "Motion Poetics", blurb_en: "Scroll, play, perform — the browser as stage." },
  { key: "minimalism", en: "Minimalism", blurb_en: "Radical restraint — type and grid as identity." },
  { key: "experimental", en: "Experimental Avant-garde", blurb_en: "Code as medium, generative systems as voice." },
  { key: "eastern", en: "Eastern Philosophy", blurb_en: "Emptiness, ink, rhythm — restraint with depth." },
];

const SCENES: { key: Scene; label: string }[] = [
  { key: "web", label: "WEB" },
  { key: "ppt", label: "PPT" },
  { key: "pdf", label: "PDF" },
  { key: "infographic", label: "INFOGRAPHIC" },
  { key: "cover", label: "COVER" },
];

export default function App() {
  const [sceneFilter, setSceneFilter] = useState<Scene | null>(null);
  const [pathFilter, setPathFilter] = useState<string | null>(null);

  const data = philosophies as Philosophy[];

  const filtered = useMemo(() => {
    return data.filter((p) => {
      if (sceneFilter && (p.scene_scores[sceneFilter] || 0) < 3) return false;
      if (pathFilter && p.best_path !== pathFilter) return false;
      return true;
    });
  }, [data, sceneFilter, pathFilter]);

  const bySchool: Record<SchoolKey, Philosophy[]> = useMemo(() => {
    const g = { information: [], motion: [], minimalism: [], experimental: [], eastern: [] } as Record<SchoolKey, Philosophy[]>;
    for (const p of filtered) g[p.school_key].push(p);
    return g;
  }, [filtered]);

  return (
    <div className="min-h-screen">
      <header className="px-6 lg:px-10 pt-12 pb-10 border-b border-[color:var(--rule)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mono text-[10px] tracking-[0.3em] text-[color:var(--accent)] uppercase">Huashu · Design · Gallery</div>
          <h1 className="text-5xl lg:text-[68px] leading-[0.95] mt-4 max-w-4xl">
            Twenty design philosophies,<br />
            <span className="text-[color:var(--ink-dim)] italic">one copy-paste away.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[color:var(--ink-dim)] text-[15px] leading-relaxed">
            A browsable gallery of the design philosophies shipped in{" "}
            <a href="https://github.com/alchaincyf/huashu-design" className="text-[color:var(--accent)] underline decoration-1 underline-offset-2" target="_blank" rel="noreferrer">alchaincyf/huashu-design</a>{" "}
            (⭐ 2,699). Click any card's <span className="mono">copy prompt DNA</span> button to paste a ready-made style prompt straight into Claude Code, Cursor, or OpenClaw. Five schools, twenty philosophies.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 items-center text-[12px]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="mono uppercase text-[color:var(--ink-faint)] tracking-widest">Best for</span>
              {SCENES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSceneFilter(sceneFilter === s.key ? null : s.key)}
                  className={`mono uppercase tracking-widest px-2 py-1 border ${sceneFilter === s.key ? "border-[color:var(--accent)] text-[color:var(--accent)]" : "border-[color:var(--rule)] text-[color:var(--ink-dim)] hover:border-[color:var(--accent-dim)]"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="mono uppercase text-[color:var(--ink-faint)] tracking-widest">Path</span>
              {["HTML", "AI生成", "混合"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPathFilter(pathFilter === p ? null : p)}
                  className={`mono uppercase tracking-widest px-2 py-1 border ${pathFilter === p ? "border-[color:var(--accent)] text-[color:var(--accent)]" : "border-[color:var(--rule)] text-[color:var(--ink-dim)] hover:border-[color:var(--accent-dim)]"}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="ml-auto mono text-[11px] text-[color:var(--ink-faint)] tracking-wider">
              {filtered.length} / {data.length} philosophies
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-10 py-12 max-w-[1400px] mx-auto">
        {SCHOOLS.map((school, idx) => {
          const items = bySchool[school.key];
          if (!items.length) return null;
          const roman = ["I", "II", "III", "IV", "V"][idx];
          return (
            <section key={school.key} className="mb-20">
              <div className="flex items-baseline gap-4 mb-8 pb-4 border-b border-[color:var(--rule)]">
                <div className="mono text-[10px] tracking-[0.3em] text-[color:var(--accent)] uppercase">{roman}</div>
                <div>
                  <h2 className="text-3xl">{school.en}</h2>
                </div>
                <div className="ml-auto text-[12px] text-[color:var(--ink-faint)] italic hidden md:block max-w-sm text-right" style={{ fontFamily: "var(--serif)" }}>
                  {school.blurb_en}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {items.map((p) => (
                  <PhilosophyCard key={p.number} philosophy={p} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <DemoStrip />

      <footer className="px-6 lg:px-10 py-10 border-t border-[color:var(--rule)] text-[12px] text-[color:var(--ink-faint)] max-w-[1400px] mx-auto flex flex-wrap gap-4 justify-between">
        <div>
          Built by Wilson 🏐 for the Trollefsen household · Nightly MVP · {new Date().toISOString().slice(0, 10)}
        </div>
        <div className="mono tracking-wider uppercase">
          Source: <a className="text-[color:var(--ink-dim)] hover:text-[color:var(--accent)]" href="https://github.com/alchaincyf/huashu-design" target="_blank" rel="noreferrer">alchaincyf/huashu-design</a>
        </div>
      </footer>
    </div>
  );
}
