import { useState } from "react";

export function CopyPromptButton({ prompt, name }: { prompt: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const payload = `Apply this design philosophy to my current file or project:\n\n${prompt}\n\n(Reference: ${name} · huashu-design)`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = payload;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      onClick={onCopy}
      className="mono text-[11px] tracking-wider uppercase border border-[color:var(--rule)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] px-3 py-1.5 transition-colors duration-150"
      title="Copies a Claude Code-ready prompt to your clipboard"
    >
      {copied ? "✓ copied" : "copy prompt DNA"}
    </button>
  );
}
