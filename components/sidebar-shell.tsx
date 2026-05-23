"use client";

import { useState } from "react";
import ActivityBar from "./activity-bar";

export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <ActivityBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />
      {sidebarOpen && children}
    </>
  );
}
