"use client";

import styles from "./RasmusWebsite.module.css";

/**
 * Rasmus Website – Figma design (RasmusWebsite.fig) as Next.js TSX.
 * Cursor IDE mockup: menu bar, activity bar, sidebar, editor tabs, code area, status bar.
 */
export default function RasmusWebsiteFigPage() {
  return (
    <div className={styles.vectorParent}>
      {/* Main background */}
      <div className={styles.vectorIcon} aria-hidden />

      <div className={styles.codeArea}>
        <div className={styles.vectorIcon2} aria-hidden />
        <div className={styles.import}>import</div>
        <div className={styles.type}> type </div>
        <div className={styles.metadata}>Metadata</div>
        <div className={styles.from}> from </div>
        <div className={styles.next}>&quot;next&quot;</div>
        <div className={styles.import2}>import</div>
        <div className={styles.text}> </div>
        <div className={styles.globalscss}>&quot;./globals.css&quot;</div>
        <div className={styles.div}>&</div>
        <div className={styles.export}>export</div>
        <div className={styles.text2}> </div>
        <div className={styles.const}>const</div>
        <div className={styles.metadata2}> metadata: </div>
        <div className={styles.metadata3}>Metadata</div>
        <div className={styles.div2}> = &#123; & &#125;</div>
        <div className={styles.export2}>export</div>
        <div className={styles.text3}> </div>
        <div className={styles.default}>default</div>
        <div className={styles.text4}> </div>
        <div className={styles.function}>function</div>
        <div className={styles.rootlayout}> RootLayout(&) &#123;</div>
        <div className={styles.return}>return</div>
        <div className={styles.div3}> (</div>
        <div className={styles.text5} />
        <div className={styles.html}>html</div>
        <div className={styles.div4}> &gt;</div>
        <div className={styles.text6} />
        <div className={styles.body}>body</div>
        <div className={styles.div5}> &gt;</div>
        <div className={styles.text7} />
        <div className={styles.div6}>&lt;/</div>
        <div className={styles.body2}>body</div>
        <div className={styles.div7}>&gt;</div>
        <div className={styles.div8}>&lt;/</div>
        <div className={styles.html2}>html</div>
        <div className={styles.div9}>&gt;</div>
      </div>

      <div className={styles.menuBar}>
        <div className={styles.vectorIcon3} aria-hidden />
        <span className={styles.file}>File</span>
        <span className={styles.edit}>Edit</span>
        <span className={styles.selection}>Selection</span>
        <span className={styles.view}>View</span>
        <span className={styles.go}>Go</span>
        <span className={styles.run}>Run</span>
        <span className={styles.terminal}>Terminal</span>
        <span className={styles.help}>Help</span>
        <span className={styles.layouttsxRasmusWebsite}>
          layout.tsx - rasmus-website - Cursor
        </span>
      </div>

      <div className={styles.activityBarIcon} aria-hidden />

      <aside className={styles.sidebar}>
        <div className={styles.vectorIconSidebar} aria-hidden />
        <b className={styles.rasmusWebsite}>RASMUS-WEBSITE</b>
        <div className={styles.faviconico}>favicon.ico</div>
        <div className={styles.globalscss2}>globals.css</div>
        <div className={styles.vectorIcon5} aria-hidden />
        <div className={styles.layouttsx}>layout.tsx</div>
        <div className={styles.pagetsx}>page.tsx</div>
      </aside>

      <div className={styles.editorTabs}>
        <div className={styles.vectorIcon6} aria-hidden />
        <span className={styles.untitledfig}>Untitled.fig</span>
        <div className={styles.vectorIcon7} aria-hidden />
        <div className={styles.vectorIcon8} aria-hidden />
        <span className={styles.layouttsx2}>layout.tsx</span>
        <span className={styles.text8} />
      </div>

      <footer className={styles.statusBar}>
        <div className={styles.vectorIcon9} aria-hidden />
        <span className={styles.master}>master *</span>
        <span className={styles.rasmusWebsite2}>rasmus-website</span>
        <span className={styles.errors4Warnings}>0 errors 4 warnings</span>
        <span className={styles.ln1Col}>Ln 1, Col 1</span>
        <span className={styles.utf8}>UTF-8</span>
        <span className={styles.typescriptJsx}>TypeScript JSX</span>
      </footer>
    </div>
  );
}
