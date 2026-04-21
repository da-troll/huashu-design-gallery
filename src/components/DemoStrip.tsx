import { useState } from "react";

const DEMOS = [
  { file: "c1-ios-prototype-en.html", title: "iOS Prototype", sub: "Capability · hi-fi clickable prototype" },
  { file: "c2-slides-pptx-en.html", title: "HTML → PPTX", sub: "Capability · editable slide export" },
  { file: "c3-motion-design-en.html", title: "Motion Design", sub: "Capability · Stage + Sprite animation" },
  { file: "c4-tweaks-en.html", title: "Tweaks", sub: "Capability · live variant switcher" },
  { file: "c5-infographic-en.html", title: "Infographic", sub: "Capability · print-grade typography" },
  { file: "c6-expert-review-en.html", title: "Expert Review", sub: "Capability · 5-axis design critique" },
  { file: "w1-brand-protocol-en.html", title: "Brand Protocol", sub: "Workflow · 5-step asset discovery" },
  { file: "w2-junior-designer-en.html", title: "Junior Designer", sub: "Workflow · assumptions-first" },
  { file: "w3-fallback-advisor-en.html", title: "Design Advisor", sub: "Workflow · 20-philosophy fallback" },
];

export function DemoStrip() {
  const [active, setActive] = useState<Set<string>>(new Set());

  const activate = (file: string) => setActive((s) => new Set(s).add(file));
  const deactivate = (file: string) =>
    setActive((s) => {
      const n = new Set(s);
      n.delete(file);
      return n;
    });

  return (
    <section className="px-6 lg:px-10 pb-16">
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <div>
          <div className="mono text-[10px] tracking-widest text-[color:var(--ink-faint)] uppercase">III · Capability Demos</div>
          <h2 className="text-2xl mt-1">Shipped demos from the source skill</h2>
          <p className="text-sm text-[color:var(--ink-dim)] mt-1">
            The nine HTML prototypes bundled with <code className="mono text-[12px]">alchaincyf/huashu-design</code>. Click a tile to load — some demos play audio or animation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {DEMOS.map((d) => {
          const isActive = active.has(d.file);
          return (
            <article key={d.file} className="border border-[color:var(--rule)] bg-[color:var(--bg-card)] flex flex-col">
              <div className="aspect-[16/10] bg-white overflow-hidden relative">
                {isActive ? (
                  <iframe
                    src={`./demos/${d.file}`}
                    title={d.title}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <button
                    onClick={() => activate(d.file)}
                    className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[color:var(--bg)] text-[color:var(--ink-dim)] hover:text-[color:var(--accent)] hover:bg-[color:var(--bg-card)] transition-colors group"
                    aria-label={`Load ${d.title} demo`}
                  >
                    <div className="w-14 h-14 rounded-full border border-[color:var(--rule)] flex items-center justify-center group-hover:border-[color:var(--accent)]">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M4 2 L16 9 L4 16 Z" /></svg>
                    </div>
                    <div className="mono text-[10px] uppercase tracking-[0.25em]">load preview</div>
                  </button>
                )}
              </div>
              <div className="p-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[14px]">{d.title}</div>
                  <div className="mono text-[10px] text-[color:var(--ink-faint)] uppercase tracking-wider">{d.sub}</div>
                </div>
                <div className="flex items-center gap-3">
                  {isActive && (
                    <button
                      onClick={() => deactivate(d.file)}
                      className="mono text-[10px] uppercase tracking-wider text-[color:var(--ink-faint)] hover:text-[color:var(--accent)]"
                      aria-label="Stop preview"
                    >
                      stop ■
                    </button>
                  )}
                  <a
                    href={`./demos/${d.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mono text-[10px] uppercase tracking-wider text-[color:var(--ink-dim)] hover:text-[color:var(--accent)]"
                  >
                    open ↗
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
