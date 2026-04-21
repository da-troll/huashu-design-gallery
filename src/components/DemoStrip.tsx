import { useState } from "react";

const DEMOS = [
  { file: "c1-ios-prototype-en.html", title: "iOS Prototype", sub: "Capability · hi-fi clickable prototype", hasAudio: true },
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
  const [muted, setMuted] = useState<Set<string>>(new Set());

  const toggleMute = (file: string) =>
    setMuted((s) => {
      const n = new Set(s);
      if (n.has(file)) n.delete(file);
      else n.add(file);
      return n;
    });

  return (
    <section className="px-6 lg:px-10 pb-16">
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <div>
          <div className="mono text-[10px] tracking-widest text-[color:var(--ink-faint)] uppercase">III · Capability Demos</div>
          <h2 className="text-2xl mt-1">Shipped demos from the source skill</h2>
          <p className="text-sm text-[color:var(--ink-dim)] mt-1">
            The nine HTML prototypes bundled with <code className="mono text-[12px]">alchaincyf/huashu-design</code>. Iframed verbatim. Open each to inspect source.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {DEMOS.map((d) => {
          const isMuted = muted.has(d.file);
          return (
            <article key={d.file} className="border border-[color:var(--rule)] bg-[color:var(--bg-card)] flex flex-col">
              <div className="aspect-[16/10] bg-white overflow-hidden relative">
                <iframe
                  src={isMuted ? "about:blank" : `./demos/${d.file}`}
                  title={d.title}
                  loading="lazy"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                />
                {d.hasAudio && (
                  <button
                    onClick={() => toggleMute(d.file)}
                    className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center text-white/90 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    aria-label={isMuted ? "Unmute demo" : "Mute demo"}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                        <line x1="22" y1="9" x2="16" y2="15" />
                        <line x1="16" y1="9" x2="22" y2="15" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
              <div className="p-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[14px]">{d.title}</div>
                  <div className="mono text-[10px] text-[color:var(--ink-faint)] uppercase tracking-wider">{d.sub}</div>
                </div>
                <a
                  href={`./demos/${d.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mono text-[10px] uppercase tracking-wider text-[color:var(--ink-dim)] hover:text-[color:var(--accent)]"
                >
                  open ↗
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
