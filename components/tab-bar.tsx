"use client";

import { usePathname } from "@/i18n/navigation";
import { FileBraces, LetterText, X } from "lucide-react";

type FileType = "tsx" | "mdx";

interface TabInfo {
  name: string;
  type: FileType;
}

const PATH_MAP: Record<string, TabInfo> = {
  "/": { name: "about.tsx", type: "tsx" },
  "/contact": { name: "contact.tsx", type: "tsx" },
  "/imprint": { name: "imprint.mdx", type: "mdx" },
  "/dataprotection": { name: "dataprotection.mdx", type: "mdx" },
  "/projects/athenegpt": { name: "athenegpt.mdx", type: "mdx" },
  "/projects/hotreload": { name: "hotreload.mdx", type: "mdx" },
  "/projects/mobileminigames": { name: "mobileminigames.mdx", type: "mdx" },
};

export default function TabBar() {
  const pathname = usePathname();
  const tab = PATH_MAP[pathname] ?? { name: "index.tsx", type: "tsx" as FileType };

  return (
    <div className="flex flex-row items-end bg-files shrink-0 h-9 border-b border-white/5">
      <div className="flex flex-row items-center gap-1.5 px-3 h-full bg-script border-t-2 border-t-botbar border-r border-r-white/10">
        {tab.type === "tsx" ? (
          <FileBraces size={13} className="text-sky-400" />
        ) : (
          <LetterText size={13} className="text-purple-400" />
        )}
        <span className="text-xs font-mono text-britty-highlight">{tab.name}</span>
        <X size={12} className="ml-1 text-britty-font opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
      </div>
    </div>
  );
}
