"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FileBraces, HatGlasses, Mail, Scale, type LucideIcon } from "lucide-react";
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
  "/imprint": { name: "imprint", icon: Scale, color: "" },
  "/dataprotection": { name: "dataprotection", icon: HatGlasses, color: "" },
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

  // Mirrors of the state above, updated synchronously in event handlers (not
  // just on commit) so that two calls to openTab/closeTab in quick succession
  // each operate on the other's result instead of both reading the same
  // stale snapshot. Kept in sync with committed state via the effect below.
  const tabsRef = useRef(tabs);
  const mruRef = useRef(mru);
  const activePathRef = useRef(activePath);

  useEffect(() => {
    tabsRef.current = tabs;
    mruRef.current = mru;
    activePathRef.current = activePath;
  }, [tabs, mru, activePath]);

  // Adjust tab state directly during render when the route changes, instead
  // of in an effect — avoids an extra cascading render after navigation.
  if (pathname !== trackedPathname) {
    setTrackedPathname(pathname);
    const newTabs = tabs.some((tab) => tab.path === pathname)
      ? tabs
      : [...tabs, { path: pathname, ...metaFor(pathname) }];
    const newMru = [...mru.filter((p) => p !== pathname), pathname];
    setTabs(newTabs);
    setActivePath(pathname);
    setMru(newMru);
  }

  function openTab(path: string) {
    const newTabs = tabsRef.current.some((tab) => tab.path === path)
      ? tabsRef.current
      : [...tabsRef.current, { path, ...metaFor(path) }];
    const newMru = [...mruRef.current.filter((p) => p !== path), path];
    tabsRef.current = newTabs;
    mruRef.current = newMru;
    activePathRef.current = path;
    setTabs(newTabs);
    setActivePath(path);
    setMru(newMru);
  }

  function selectTab(path: string) {
    openTab(path);
    if (path !== pathname) router.push(path);
  }

  function closeTab(path: string) {
    const newTabs = tabsRef.current.filter((tab) => tab.path !== path);
    tabsRef.current = newTabs;
    setTabs(newTabs);

    if (path !== activePathRef.current) {
      const newMru = mruRef.current.filter((p) => p !== path);
      mruRef.current = newMru;
      setMru(newMru);
      return;
    }

    let newMru = mruRef.current.filter((p) => p !== path);
    let next: string | null;
    if (newMru.length > 0) {
      next = newMru[newMru.length - 1];
    } else if (newTabs.length > 0) {
      next = newTabs[newTabs.length - 1].path;
      newMru = [next];
    } else {
      next = null;
    }

    mruRef.current = newMru;
    activePathRef.current = next;
    setMru(newMru);
    setActivePath(next);
    if (next !== null && next !== pathname) router.push(next);
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
