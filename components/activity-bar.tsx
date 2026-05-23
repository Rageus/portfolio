"use client";

import { Files, Search, GitBranch, Puzzle } from 'lucide-react';

interface Props {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function ActivityBar({ sidebarOpen, onToggleSidebar }: Props) {
  return (
    <div className="flex flex-col items-center w-12 shrink-0 bg-files border-r border-white/5 py-1">
      <div className="flex flex-col items-center flex-1">
        <button
          onClick={onToggleSidebar}
          className={`p-2.5 w-full flex justify-center border-l-2 transition-colors cursor-pointer ${
            sidebarOpen
              ? "text-britty-highlight border-botbar"
              : "text-britty-font opacity-40 border-transparent hover:opacity-70"
          }`}
        >
          <Files size={22} />
        </button>
        <div className="p-2.5 text-britty-font opacity-40 w-full flex justify-center hover:opacity-70 transition-opacity cursor-pointer">
          <Search size={22} />
        </div>
        <div className="p-2.5 text-britty-font opacity-40 w-full flex justify-center hover:opacity-70 transition-opacity cursor-pointer">
          <GitBranch size={22} />
        </div>
        <div className="p-2.5 text-britty-font opacity-40 w-full flex justify-center hover:opacity-70 transition-opacity cursor-pointer">
          <Puzzle size={22} />
        </div>
      </div>
    </div>
  );
}
