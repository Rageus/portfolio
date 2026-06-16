"use client";

import { createContext, useContext, useState } from "react";
import { FileBraces, LetterText, Mail, type LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";

export interface TabEntry {
  path: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface TabMeta {
  name: string;
  icon: LucideIcon;
  color: string;
}

const TAB_META: Record<string, TabMeta> = {
  "/": { name: "about", icon: FileBraces, color: "text-sky-400" },
  "/contact": { name: "contact", icon: Mail, color: "text-sky-400" },
  "/imprint": { name: "imprint", icon: LetterText, color: "text-purple-400" },
  "/dataprotection": { name: "dataprotection", icon: LetterText, color: "text-purple-400" },
  "/projects/athenegpt": { name: "athenegpt", icon: FileBraces, color: "text-sky-400" },
  "/projects/hotreload": { name: "hotreload", icon: FileBraces, color: "text-sky-400" },
  "/projects/mobileminigames": { name: "mobileminigames", icon: FileBraces, color: "text-sky-400" },
};

const DEFAULT_META: TabMeta = { name: "index", icon: FileBraces, color: "text-sky-400" };

function metaFor(path: string): TabMeta {
  return TAB_META[path] ?? DEFAULT_META;
}

interface EditorTabsValue {
  tabs: TabEntry[];
  activePath: string | null;
  openTab: (path: string) => void;
  selectTab: (path: string) => void;
  closeTab: (path: string) => void;
}

const EditorTabsContext = createContext<EditorTabsValue | null>(null);

export function EditorTabsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [tabs, setTabs] = useState<TabEntry[]>(() => [{ path: pathname, ...metaFor(pathname) }]);
  const [activePath, setActivePath] = useState<string | null>(pathname);
  const [mru, setMru] = useState<string[]>(() => [pathname]);
  const [trackedPathname, setTrackedPathname] = useState(pathname);

  // Adjust tab state directly during render when the route changes, instead
  // of in an effect — avoids an extra cascading render after navigation.
  if (pathname !== trackedPathname) {
    setTrackedPathname(pathname);
    setTabs((prev) => (prev.some((tab) => tab.path === pathname) ? prev : [...prev, { path: pathname, ...metaFor(pathname) }]));
    setActivePath(pathname);
    setMru((prev) => [...prev.filter((p) => p !== pathname), pathname]);
  }

  function openTab(path: string) {
    setTabs((prev) => (prev.some((tab) => tab.path === path) ? prev : [...prev, { path, ...metaFor(path) }]));
    setActivePath(path);
    setMru((prev) => [...prev.filter((p) => p !== path), path]);
  }

  function selectTab(path: string) {
    openTab(path);
    if (path !== pathname) router.push(path);
  }

  function closeTab(path: string) {
    const newTabs = tabs.filter((tab) => tab.path !== path);
    const newMru = mru.filter((p) => p !== path);
    setTabs(newTabs);
    setMru(newMru);

    if (path !== activePath) return;

    if (newMru.length > 0) {
      const next = newMru[newMru.length - 1];
      setActivePath(next);
      if (next !== pathname) router.push(next);
    } else if (newTabs.length > 0) {
      const next = newTabs[newTabs.length - 1].path;
      setActivePath(next);
      setMru([next]);
      if (next !== pathname) router.push(next);
    } else {
      setActivePath(null);
    }
  }

  return (
    <EditorTabsContext.Provider value={{ tabs, activePath, openTab, selectTab, closeTab }}>
      {children}
    </EditorTabsContext.Provider>
  );
}

export function useEditorTabs() {
  const ctx = useContext(EditorTabsContext);
  if (!ctx) throw new Error("useEditorTabs must be used within EditorTabsProvider");
  return ctx;
}
