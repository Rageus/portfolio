"use client";

import { usePathname } from "@/i18n/navigation";
import { FileBraces, LetterText, Mail, X, type LucideIcon } from "lucide-react";

interface TabInfo {
  name: string;
  icon: LucideIcon;
  color: string;
}

const PATH_MAP: Record<string, TabInfo> = {
  "/": { name: "about", icon: FileBraces, color: "text-sky-400" },
  "/contact": { name: "contact", icon: Mail, color: "text-sky-400" },
  "/imprint": { name: "imprint", icon: LetterText, color: "text-purple-400" },
  "/dataprotection": { name: "dataprotection", icon: LetterText, color: "text-purple-400" },
  "/projects/athenegpt": { name: "athenegpt", icon: FileBraces, color: "text-sky-400" },
  "/projects/hotreload": { name: "hotreload", icon: FileBraces, color: "text-sky-400" },
  "/projects/mobileminigames": { name: "mobileminigames", icon: FileBraces, color: "text-sky-400" },
};

const DEFAULT_TAB: TabInfo = { name: "index", icon: FileBraces, color: "text-sky-400" };

export default function TabBar() {
  const pathname = usePathname();
  const tab = PATH_MAP[pathname] ?? DEFAULT_TAB;
  const Icon = tab.icon;

  return (
    <div className="flex flex-row items-end bg-files shrink-0 h-9 border-b border-white/5">
      <div className="flex flex-row items-center gap-1.5 px-3 h-full bg-script border-t-2 border-t-botbar border-r border-r-white/10">
        <Icon size={13} className={tab.color} />
        <span className="text-xs font-mono text-britty-highlight">{tab.name}</span>
        <X size={12} className="ml-1 text-britty-font opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
      </div>
    </div>
  );
}
