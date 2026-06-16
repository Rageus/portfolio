"use client";

import { useState } from "react";
import ActivityBar from "./activity-bar";
import TerminalPanel from "./terminal";
import { EditorTabsProvider } from "./editor-tabs-context";

export default function WorkspaceShell({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);

  return (
    <EditorTabsProvider>
      <div className="flex flex-1 min-h-0 flex-row w-full">
        <ActivityBar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((o) => !o)}
          terminalOpen={terminalOpen}
          onToggleTerminal={() => setTerminalOpen((o) => !o)}
        />
        {sidebarOpen && sidebar}
        <div className="min-h-0 flex-1 flex flex-col bg-script">
          {children}
          {terminalOpen && <TerminalPanel onClose={() => setTerminalOpen(false)} />}
        </div>
      </div>
    </EditorTabsProvider>
  );
}
