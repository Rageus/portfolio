"use client";

import { useCallback, useRef, useState } from "react";
import ActivityBar from "./activity-bar";
import TerminalPanel from "./terminal";
import { EditorTabsProvider } from "./editor-tabs-context";

const DEFAULT_SIDEBAR_WIDTH = 240;
const MIN_SIDEBAR_WIDTH = 240;
const MAX_SIDEBAR_WIDTH = 480;

const DEFAULT_TERMINAL_HEIGHT = 208;
const MIN_TERMINAL_HEIGHT = 120;
const MAX_TERMINAL_HEIGHT = 600;
const TERMINAL_COLLAPSE_THRESHOLD = 60;

type DragState = { type: "sidebar" | "terminal"; start: number; startSize: number };

export default function WorkspaceShell({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [terminalHeight, setTerminalHeight] = useState(DEFAULT_TERMINAL_HEIGHT);

  const dragRef = useRef<DragState | null>(null);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;

    if (drag.type === "sidebar") {
      const next = drag.startSize + (e.clientX - drag.start);
      setSidebarWidth(Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, next)));
    } else {
      const next = drag.startSize + (drag.start - e.clientY);
      if (next < TERMINAL_COLLAPSE_THRESHOLD) {
        setTerminalOpen(false);
      } else {
        setTerminalOpen(true);
        setTerminalHeight(Math.min(MAX_TERMINAL_HEIGHT, Math.max(MIN_TERMINAL_HEIGHT, next)));
      }
    }
  }, []);

  const startDrag = useCallback(
    (type: DragState["type"]) => (e: React.PointerEvent) => {
      e.preventDefault();
      dragRef.current = {
        type,
        start: type === "sidebar" ? e.clientX : e.clientY,
        startSize: type === "sidebar" ? sidebarWidth : terminalHeight,
      };
      document.body.style.cursor = type === "sidebar" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";

      function stopDrag() {
        dragRef.current = null;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", stopDrag);
      }

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", stopDrag);
    },
    [sidebarWidth, terminalHeight, handlePointerMove]
  );

  return (
    <EditorTabsProvider>
      <div className="flex flex-1 min-h-0 flex-row w-full">
        <ActivityBar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((o) => !o)}
          terminalOpen={terminalOpen}
          onToggleTerminal={() => setTerminalOpen((o) => !o)}
        />
        {sidebarOpen && (
          <div className="relative flex shrink-0" style={{ width: sidebarWidth }}>
            <div className="flex-1 min-w-0 overflow-hidden">{sidebar}</div>
            <div
              onPointerDown={startDrag("sidebar")}
              className="absolute top-0 right-0 h-full w-1 -mr-0.5 cursor-col-resize hover:bg-botbar/60 transition-colors z-10"
            />
          </div>
        )}
        <div className="min-h-0 flex-1 flex flex-col bg-script">
          {children}
          {terminalOpen && (
            <div className="relative flex flex-col shrink-0" style={{ height: terminalHeight }}>
              <div
                onPointerDown={startDrag("terminal")}
                className="absolute top-0 left-0 w-full h-1 -mt-0.5 cursor-row-resize hover:bg-botbar/60 transition-colors z-10"
              />
              <TerminalPanel onClose={() => setTerminalOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </EditorTabsProvider>
  );
}
