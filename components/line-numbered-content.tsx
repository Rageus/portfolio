"use client";

import { useEffect, useRef, useState } from "react";

const LINE_HEIGHT_PX = 28; // matches the leading-7 line-height below

export default function LineNumberedContent({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => setCount(Math.max(1, Math.ceil(el.scrollHeight / LINE_HEIGHT_PX)));
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex-1 min-h-0 overflow-auto flex flex-row">
      <div
        aria-hidden
        className="select-none shrink-0 w-12 text-right pr-3 pt-4 text-britty-font text-base font-mono leading-7 opacity-30 border-r border-white/5"
      >
        {Array.from({ length: count }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div ref={contentRef} className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
