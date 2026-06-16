"use client";

import { FileX } from "lucide-react";
import { useTranslations } from "next-intl";
import TabBar from "./tab-bar";
import { useEditorTabs } from "./editor-tabs-context";

export default function EditorPane({ children }: { children: React.ReactNode }) {
  const t = useTranslations("editor");
  const { tabs, activePath, selectTab, closeTab } = useEditorTabs();

  return (
    <>
      {tabs.length > 0 && (
        <TabBar tabs={tabs} activePath={activePath} onSelect={selectTab} onClose={closeTab} />
      )}
      {activePath === null ? (
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3 text-britty-font bg-script">
          <FileX size={56} className="opacity-20" />
          <p className="text-sm opacity-40">{t("noTabsOpen")}</p>
        </div>
      ) : (
        children
      )}
    </>
  );
}
