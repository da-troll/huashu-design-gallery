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
        {DEMOS.map((d) => (
          <article key={d.file} className="border border-[color:var(--rule)] bg-[color:var(--bg-card)] flex flex-col">
            <div className="aspect-[16/10] bg-white overflow-hidden">
              <iframe
                src={`./demos/${d.file}`}
                title={d.title}
                loading="lazy"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
              />
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
        ))}
      </div>
    </section>
  );
}
