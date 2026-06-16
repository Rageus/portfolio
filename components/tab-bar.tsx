"use client";

import { X, type LucideIcon } from "lucide-react";

export interface TabEntry {
  path: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface Props {
  tabs: TabEntry[];
  activePath: string | null;
  onSelect: (path: string) => void;
  onClose: (path: string) => void;
}

export default function TabBar({ tabs, activePath, onSelect, onClose }: Props) {
  return (
    <div className="flex flex-row items-end bg-files shrink-0 h-9 border-b border-white/5 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.path === activePath;

        return (
          <div
            key={tab.path}
            onClick={() => onSelect(tab.path)}
            className={`flex flex-row items-center gap-1.5 px-3 h-full border-r border-r-white/10 cursor-pointer shrink-0 ${
              isActive ? "bg-script border-t-2 border-t-botbar" : "bg-files hover:bg-file-hover"
            }`}
          >
            <Icon size={13} className={tab.color} />
            <span className="text-xs font-mono text-britty-highlight">{tab.name}</span>
            <X
              size={12}
              onClick={(e) => {
                e.stopPropagation();
                onClose(tab.path);
              }}
              className="ml-1 text-britty-font opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
}
