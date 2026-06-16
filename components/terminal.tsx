"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

type LineType = "input" | "output";

interface Line {
  id: number;
  type: LineType;
  text: string;
}

export default function TerminalPanel({ onClose }: { onClose: () => void }) {
  const t = useTranslations("terminal");
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const nextId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function pushOutput(texts: string[]) {
    setLines((prev) => [
      ...prev,
      ...texts.map((text) => ({ id: nextId.current++, type: "output" as const, text })),
    ]);
  }

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    setLines((prev) => [...prev, { id: nextId.current++, type: "input", text: trimmed }]);
    setInput("");

    pushOutput([t("aiStub")]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runCommand(input);
  }

  return (
    <div className="h-52 shrink-0 border-t border-white/5 bg-files flex flex-col">
      <div className="h-8 shrink-0 flex items-center gap-4 px-4 border-b border-white/5 text-[11px] uppercase tracking-wide text-britty-font">
        <span className="h-8 flex items-center text-britty-highlight">{t("tabTerminal")}</span>
        <div className="flex-1" />
        <span className="opacity-60 font-mono normal-case">{t("shell")}</span>
        <button
          onClick={onClose}
          aria-label={t("close")}
          title={t("close")}
          className="opacity-60 hover:opacity-100 hover:text-white transition-opacity cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto px-4 py-2.5 font-mono text-[13px] leading-5 text-britty-font"
      >
        <div>
          <span className="text-blue-400">rasmus@portfolio</span>{" "}
          <span className="text-yellow-400">{t("promptPath")}</span>{" "}
          <span className="text-sky-400">{t("promptBranch")}</span>
        </div>
        {lines.map((line) => (
          <div key={line.id} className={line.type === "output" ? "opacity-80 whitespace-pre-wrap" : ""}>
            {line.type === "input" ? (
              <>
                <span className="text-green-400">$</span> {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent outline-none text-britty-highlight placeholder:text-britty-font/50"
          />
        </form>
      </div>
    </div>
  );
}
