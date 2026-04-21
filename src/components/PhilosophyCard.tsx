import type { Philosophy } from "../types";
import { StyleSwatch } from "./StyleSwatch";
import { CopyPromptButton } from "./CopyPromptButton";

// Household agents that "have tried" this philosophy. Seeded empty;
// easy to populate later as agents actually use each one.
const HOUSEHOLD_TRIED: Record<number, string[]> = {};

const SUBTITLE_EN: Record<number, string> = {
  1: "Michael Bierut style",
  2: "Data poetics",
  3: "Content-first",
  4: "Scientific storytelling",
  5: "Masters of scroll narrative",
  6: "WebGL poets",
  7: "Algorithmic aesthetics",
  8: "Narrative-driven interaction",
  9: "Conceptual minimalism",
  10: "Brockmann lineage · Swiss grid purism",
  11: "Contemporary minimal brand",
  12: "Joyful minimalism",
  13: "Code as poetry",
  14: "Parametric aesthetics",
  15: "Cyber-poetic",
  16: "Screen-interface fiction",
  17: "Japanese speculative design",
  18: "Design of emptiness",
  19: "Book architect",
  20: "Eastern light-and-shadow poetry",
};

const AGENT_META: Record<string, { emoji: string; name: string }> = {
  wilson: { emoji: "🏐", name: "Wilson" },
  eve: { emoji: "🌱", name: "Eve" },
  pepper: { emoji: "🌶️", name: "Pepper" },
  radar: { emoji: "📡", name: "Radar" },
  c3po: { emoji: "🤖", name: "C-3PO" },
};

function sceneBadge(label: string, stars: number | undefined) {
  if (!stars) return null;
  const s = "★".repeat(stars) + "☆".repeat(3 - stars);
  return (
    <div className="mono text-[9px] tracking-wider text-[color:var(--ink-dim)]">
      <span className="opacity-60">{label}</span>&nbsp;<span className="text-[color:var(--accent-dim)]">{s}</span>
    </div>
  );
}

export function PhilosophyCard({ philosophy: p }: { philosophy: Philosophy }) {
  const tried = HOUSEHOLD_TRIED[p.number] || [];
  const studio = SUBTITLE_EN[p.number] || "";

  return (
    <article className="bg-[color:var(--bg-card)] border border-[color:var(--rule)] hover:border-[color:var(--accent-dim)] transition-colors duration-200 flex flex-col">
      <StyleSwatch philosophy={p} />

      <div className="p-4 flex-1 flex flex-col gap-3">
        <header className="flex items-baseline justify-between gap-2">
          <div>
            <div className="mono text-[10px] text-[color:var(--ink-faint)] tracking-widest">
              {String(p.number).padStart(2, "0")} · {p.school_en.toUpperCase()}
            </div>
            <h3 className="text-xl leading-tight mt-0.5">{p.name_en}</h3>
            {studio ? (
              <div className="text-[13px] text-[color:var(--ink-dim)] mt-0.5">{studio}</div>
            ) : null}
          </div>
          <div className="mono text-[9px] text-[color:var(--accent-dim)] uppercase tracking-wider whitespace-nowrap">
            {p.best_path}
          </div>
        </header>

        {p.philosophy_en ? (
          <blockquote className="italic text-[color:var(--ink)] text-[15px] leading-snug" style={{ fontFamily: "var(--serif)" }}>
            “{p.philosophy_en}”
          </blockquote>
        ) : null}

        <ul className="text-[13px] text-[color:var(--ink-dim)] space-y-1">
          {p.features_en.slice(0, 4).map((f, i) => (
            <li key={`e${i}`} className="flex gap-2"><span className="text-[color:var(--accent-dim)]">—</span><span>{f}</span></li>
          ))}
        </ul>

        {p.rep_work ? (
          <div className="text-[11px] text-[color:var(--ink-faint)]">
            <span className="mono tracking-wider uppercase opacity-70">Rep.</span> {p.rep_work}
          </div>
        ) : null}

        <details className="group">
          <summary className="mono text-[10px] tracking-widest text-[color:var(--ink-dim)] cursor-pointer hover:text-[color:var(--accent)] uppercase list-none flex items-center gap-1.5">
            <span className="inline-block transition-transform group-open:rotate-90">▸</span> prompt DNA
          </summary>
          <pre className="mono text-[11px] leading-snug bg-[color:var(--bg-elev)] border border-[color:var(--rule)] p-3 mt-2 overflow-x-auto whitespace-pre-wrap text-[color:var(--ink)]">
{p.prompt_dna}
          </pre>
        </details>

        <div className="mt-auto pt-3 border-t border-[color:var(--rule)] flex items-end justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            {sceneBadge("WEB", p.scene_scores.web)}
            {sceneBadge("PPT", p.scene_scores.ppt)}
            {sceneBadge("INFO", p.scene_scores.infographic)}
          </div>
          <CopyPromptButton prompt={p.prompt_dna} name={p.name_en} />
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-[color:var(--ink-faint)]">
          <span className="mono uppercase tracking-wider opacity-70">Tried:</span>
          {tried.length ? (
            tried.map((a) => (
              <span key={a} title={AGENT_META[a]?.name || a} className="text-sm">
                {AGENT_META[a]?.emoji || "•"}
              </span>
            ))
          ) : (
            <span className="opacity-60 italic">(none yet)</span>
          )}
        </div>
      </div>
    </article>
  );
}
