import type { Philosophy } from "../types";

// Small visual sketch evoking each philosophy's DNA. One custom sketch per
// number — overkill but credible. Each sits in a 16:9 frame.

function Pentagram() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-[#ffffff] flex">
      <div className="flex-1 flex items-center justify-center text-black" style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 44, fontWeight: 700, letterSpacing: "-0.04em" }}>H</div>
      <div className="w-[2px] bg-[#d13b3b]" />
      <div className="flex-1 flex items-center justify-center text-black" style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 14, letterSpacing: "0.3em" }}>PENTAGRAM</div>
    </div>
  );
}

function Stamen() {
  return (
    <div className="swatch w-full aspect-[16/9]" style={{ background: "#f3ead6" }}>
      <svg viewBox="0 0 160 90" className="w-full h-full">
        <path d="M10 70 Q 40 30 80 50 T 150 40" fill="none" stroke="#c97b4a" strokeWidth="2" />
        <path d="M10 80 Q 50 50 90 65 T 150 55" fill="none" stroke="#7a8f5e" strokeWidth="2" />
        <path d="M10 60 Q 30 80 70 70 T 150 75" fill="none" stroke="#3b5f7a" strokeWidth="2" />
        {Array.from({ length: 14 }).map((_, i) => (
          <circle key={i} cx={15 + i * 10} cy={30 + Math.sin(i) * 8} r="1.5" fill="#3b5f7a" />
        ))}
      </svg>
    </div>
  );
}

function IA() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-[#fafafa] text-black p-4" style={{ fontFamily: "-apple-system, system-ui, sans-serif", fontSize: 11, lineHeight: 1.55 }}>
      <div className="text-[13px] mb-1 font-medium">On Design as Content Architecture</div>
      <div className="text-neutral-600">Reading is the act. Every pixel serves the reader.</div>
      <a className="text-[#0000ee] underline decoration-1 underline-offset-2 mt-2 inline-block">Continue reading →</a>
    </div>
  );
}

function Fathom() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-[#eef1f5] p-3">
      <svg viewBox="0 0 160 90" className="w-full h-full">
        {Array.from({ length: 18 }).map((_, i) => (
          <rect key={i} x={10 + i * 8} y={80 - (i * 3 + (i % 5) * 7)} width="5" height={i * 3 + (i % 5) * 7} fill="#2c4862" opacity={0.85} />
        ))}
        <text x="10" y="12" fontSize="7" fill="#2c4862" fontFamily="Georgia, serif">Fig. 1 · Surge velocity, 2019–2024</text>
      </svg>
    </div>
  );
}

function Locomotive() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-black text-white overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 60, fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap", paddingLeft: 20 }}>
          scroll · cinéma
        </div>
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] tracking-widest text-neutral-500">01 / 06</div>
    </div>
  );
}

function ActiveTheory() {
  return (
    <div className="swatch w-full aspect-[16/9]" style={{ background: "radial-gradient(circle at 30% 40%, #ff4eb5, #5000ff 50%, #0a0024 100%)" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-2xl" style={{ fontFamily: "Space Grotesk, system-ui", fontWeight: 700, letterSpacing: "-0.02em" }}>PLAY ▸</div>
      </div>
    </div>
  );
}

function FieldIO() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-[#0a0e14]">
      <svg viewBox="0 0 160 90" className="w-full h-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={80 + Math.cos(i * 0.6) * 30} cy={45 + Math.sin(i * 0.6) * 22} r={1 + (i % 3)} fill="#00d1ff" opacity={0.8 - i * 0.05} />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={i} x1={20 + (i * 4)} y1={70} x2={30 + (i * 4)} y2={80} stroke="#00d1ff" strokeWidth="0.5" opacity="0.4" />
        ))}
      </svg>
    </div>
  );
}

function Resn() {
  return (
    <div className="swatch w-full aspect-[16/9]" style={{ background: "linear-gradient(135deg, #1a0033 0%, #7000a3 50%, #e63900 100%)" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/80 blur-sm" />
        <div className="absolute w-10 h-10 rounded-full bg-black" />
      </div>
    </div>
  );
}

function ExperimentalJetset() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-white text-black p-3 font-bold" style={{ fontFamily: "Helvetica, Arial Black, sans-serif" }}>
      <div style={{ fontSize: 22, lineHeight: 1, letterSpacing: "-0.03em" }}>DE-<br />SIGN<br />IS&nbsp;TYPE.</div>
    </div>
  );
}

function Muller() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-white p-3">
      <div className="grid grid-cols-6 gap-[3px] h-full">
        {Array.from({ length: 6 * 4 }).map((_, i) => (
          <div key={i} className={i % 7 === 0 ? "bg-[#d13b3b]" : i % 3 === 0 ? "bg-black" : "bg-neutral-100 border border-neutral-200"} />
        ))}
      </div>
    </div>
  );
}

function Build() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-[#ffeb3b] p-3 text-black" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
      <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em" }}>B/11</div>
      <div className="text-xs tracking-wide absolute bottom-3 right-3">BUILD · STUDIO</div>
    </div>
  );
}

function Sagmeister() {
  return (
    <div className="swatch w-full aspect-[16/9]" style={{ background: "#ffb8d1" }}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 30, color: "#c7005a", transform: "rotate(-3deg)" }}>
        happy.
      </div>
    </div>
  );
}

function ZachLieberman() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-black">
      <svg viewBox="0 0 160 90" className="w-full h-full">
        {Array.from({ length: 50 }).map((_, i) => (
          <circle key={i} cx={80 + Math.sin(i * 0.4) * (i * 0.9)} cy={45 + Math.cos(i * 0.4) * (i * 0.5)} r="1" fill="white" opacity={0.9 - i * 0.015} />
        ))}
      </svg>
    </div>
  );
}

function RavenKwok() {
  return (
    <div className="swatch w-full aspect-[16/9]" style={{ background: "#0a0a0a" }}>
      <svg viewBox="0 0 160 90" className="w-full h-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={10 + i * 20} y={20 + (i % 2) * 30} width="15" height="15" fill="none" stroke={i % 2 ? "#ff2a6d" : "#2affea"} strokeWidth="1" transform={`rotate(${i * 15} ${17 + i * 20} ${27 + (i % 2) * 30})`} />
        ))}
      </svg>
    </div>
  );
}

function AshThorp() {
  return (
    <div className="swatch w-full aspect-[16/9]" style={{ background: "linear-gradient(180deg, #0d1b2a 0%, #1b2e40 50%, #5a3626 100%)" }}>
      <svg viewBox="0 0 160 90" className="w-full h-full">
        <polygon points="80,15 100,40 130,40 105,60 115,85 80,70 45,85 55,60 30,40 60,40" fill="none" stroke="#e8b57c" strokeWidth="0.8" opacity="0.9" />
        <polygon points="80,25 92,40 110,40 95,55 102,75 80,65 58,75 65,55 50,40 68,40" fill="none" stroke="#e8b57c" strokeWidth="0.5" opacity="0.6" />
      </svg>
    </div>
  );
}

function Territory() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-black p-2 text-[#00ff9f]" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9 }}>
      <div className="grid grid-cols-4 gap-2 h-full">
        <div className="border border-[#00ff9f]/40 p-1">SYS.01<br />●●●○○</div>
        <div className="border border-[#00ff9f]/40 p-1">TRGT<br />+2.847</div>
        <div className="border border-[#00ff9f]/40 p-1">VEL<br />0.382</div>
        <div className="border border-[#00ff9f]/40 p-1 animate-pulse">ARM</div>
      </div>
    </div>
  );
}

function Takram() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-[#0e2a2a] text-[#e8e4d5] p-3" style={{ fontFamily: "Fraunces, serif" }}>
      <div className="text-[11px] tracking-widest text-[#a4ae9a]">RESEARCH · 2024</div>
      <div className="text-lg mt-1 leading-tight">On the future of water, we wrote a brief.</div>
      <div className="absolute bottom-2 right-2 text-[9px] tracking-widest text-[#a4ae9a]">TAKRAM</div>
    </div>
  );
}

function KenyaHara() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-[#f5f1e8] text-[#1a1a1a]">
      <div className="absolute left-[10%] top-[40%] text-[40px] font-normal text-cn" style={{ letterSpacing: "0.3em" }}>空</div>
      <div className="absolute right-[10%] bottom-[18%] text-[9px] tracking-widest text-neutral-500">Emptiness · MUJI · 2003</div>
    </div>
  );
}

function IrmaBoom() {
  return (
    <div className="swatch w-full aspect-[16/9] bg-[#efe7d6] flex">
      <div className="w-1/3 bg-[#cfbb8a]" />
      <div className="flex-1 p-3 text-[#1a1a1a]" style={{ fontFamily: "Fraunces, serif" }}>
        <div className="text-[10px] tracking-widest uppercase opacity-60">Vol. III · ch.12</div>
        <div className="text-[15px] mt-1 leading-snug">A book is a landscape for the hand.</div>
      </div>
    </div>
  );
}

function NeoShen() {
  return (
    <div className="swatch w-full aspect-[16/9]" style={{ background: "#f0e6d2" }}>
      <div className="absolute inset-0 flex items-center">
        <div className="text-cn text-[52px] leading-none text-[#3a2414] pl-6" style={{ fontWeight: 500 }}>山</div>
        <div className="flex-1 pr-4 text-right text-[#3a2414] text-sm" style={{ fontFamily: "Fraunces, serif", fontStyle: "italic" }}>
          mountains hold<br /> the ink of silence
        </div>
      </div>
    </div>
  );
}

const MAP: Record<number, () => React.ReactNode> = {
  1: Pentagram, 2: Stamen, 3: IA, 4: Fathom,
  5: Locomotive, 6: ActiveTheory, 7: FieldIO, 8: Resn,
  9: ExperimentalJetset, 10: Muller, 11: Build, 12: Sagmeister,
  13: ZachLieberman, 14: RavenKwok, 15: AshThorp, 16: Territory,
  17: Takram, 18: KenyaHara, 19: IrmaBoom, 20: NeoShen,
};

export function StyleSwatch({ philosophy }: { philosophy: Philosophy }) {
  const C = MAP[philosophy.number];
  return (
    <div className="relative">
      {C ? <C /> : <div className="aspect-[16/9] bg-neutral-900" />}
    </div>
  );
}
