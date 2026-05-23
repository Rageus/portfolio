"use client";

import { usePathname } from "@/i18n/navigation";

const LANGUAGE_MAP: Record<string, string> = {
  "/": "TypeScript JSX",
  "/contact": "TypeScript JSX",
  "/imprint": "MDX",
  "/dataprotection": "MDX",
  "/projects/athenegpt": "MDX",
  "/projects/hotreload": "MDX",
  "/projects/mobileminigames": "MDX",
};

export default function StatusBarInfo() {
  const pathname = usePathname();
  const language = LANGUAGE_MAP[pathname] ?? "TypeScript JSX";

  return (
    <>
      <p className="text-white font-normal whitespace-nowrap">Ln 1, Col 1</p>
      <p className="text-white font-normal whitespace-nowrap">UTF-8</p>
      <p className="text-white font-normal whitespace-nowrap">{language}</p>
    </>
  );
}
