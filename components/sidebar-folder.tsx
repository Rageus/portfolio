"use client";

import { useState } from "react";
import { Folder, FolderOpen } from "lucide-react";

export default function SidebarFolder({
  label,
  children,
  defaultOpen = true,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex flex-row px-3 items-center gap-1 cursor-pointer w-full text-left hover:bg-file-hover transition-colors"
      >
        {open ? (
          <FolderOpen size={14} className="text-amber-400" />
        ) : (
          <Folder size={14} className="text-amber-400" />
        )}
        <p className="text-britty-highlight font-normal">{label}</p>
      </button>
      {open && children}
    </>
  );
}
