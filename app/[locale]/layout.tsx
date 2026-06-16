import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { HatGlasses, Scale, GitFork, BookMarked, Languages, FolderOpen, FileBraces, Mail } from 'lucide-react';
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import MarkdownComponent from "@/components/markdown";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LocaleSwitcher from "@/components/localeswitcher";
import NavLink from "@/components/nav-link";
import WorkspaceShell from "@/components/workspace-shell";
import EditorPane from "@/components/editor-pane";
import LineNumbers from "@/components/line-numbers";
import {
  GITHUB_REPO_URL,
  LINKEDIN_PROFILE_URL,
} from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rasmus Dießel",
  description: "Rasmus Dießel personal portfolio.",
  keywords: ["freelancer", "AI", "portfolio", "developer", "C#", "AWS", "Go", "Python", "hire me", "competent"]
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations('layout');

  return (
    <html lang={`${locale}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <div className="flex flex-col w-full h-screen max-h-screen min-h-0 overflow-hidden">
            <WorkspaceShell
              sidebar={
                <div className="flex flex-col w-60 shrink-0 bg-files pt-[11px]">
                  <div className="flex flex-col w-60 shrink-0 gap-2 bg-files">
                    <div className="flex flex-row items-center gap-1.5 cursor-pointer">
                      <p className="text-britty-highlight px-3 text-xl font-bold">Rasmus Dießel</p>
                    </div>
                    <div className="flex flex-row items-center gap-1.5 cursor-pointer">
                      <p className="text-britty-highlight px-3 font-normal">{t('title')}</p>
                    </div>
                  </div>
                  <div className="h-4 shrink-0" aria-hidden />
                  <NavLink href="/" className="px-3">
                    <FileBraces size={14} className="text-sky-400" />
                    <p className="text-britty-highlight font-normal">{t('about')}</p>
                  </NavLink>
                  <NavLink href="/contact" className="px-3">
                    <Mail size={14} className="text-sky-400" />
                    <p className="text-britty-highlight font-normal">{t('contact')}</p>
                  </NavLink>
                  <div className="flex flex-row px-3 items-center gap-1 cursor-pointer">
                    <FolderOpen size={14} className="text-amber-400" />
                    <p className="text-britty-highlight font-normal">{t('projects')}</p>
                  </div>
                  <a href="https://athenegpt.ai/" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center px-8 gap-1.5 cursor-pointer hover:bg-file-hover transition-colors">
                    <FileBraces size={14} className="text-sky-400" />
                    <p className="text-britty-highlight font-normal">Athene GPT</p>
                  </a>
                  <a href="https://hotreload.net/" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center px-8 gap-1.5 cursor-pointer hover:bg-file-hover transition-colors">
                    <FileBraces size={14} className="text-sky-400" />
                    <p className="text-britty-highlight font-normal">Hot Reload</p>
                  </a>
                  <a href="https://mobileminigames.com/" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center px-8 gap-1.5 cursor-pointer hover:bg-file-hover transition-colors">
                    <FileBraces size={14} className="text-sky-400" />
                    <p className="text-britty-highlight font-normal">Mobile Minigames</p>
                  </a>
                  <div className="flex flex-row px-3 items-center gap-1 cursor-pointer">
                    <FolderOpen size={14} className="text-amber-400" />
                    <p className="text-britty-highlight font-normal">{t('links')}</p>
                  </div>
                  <a
                    href={LINKEDIN_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row items-center px-8 gap-1.5 cursor-pointer hover:bg-file-hover transition-colors"
                  >
                    <span className="ml-px block">
                      <Image src="/LinkedIn.svg" alt="LinkedIn" width={14} height={14} />
                    </span>
                    <p className="text-britty-highlight font-normal">LinkedIn</p>
                  </a>
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row items-center px-7.5 gap-1 cursor-pointer hover:bg-file-hover transition-colors"
                  >
                    <span className="-mt-0.5 block">
                      <Image src="/GitHub.svg" alt="GitHub" width={17} height={17} />
                    </span>
                    <p className="text-britty-highlight font-normal">GitHub</p>
                  </a>
                </div>
              }
            >
              <EditorPane>
                <div className="flex-1 min-h-0 overflow-auto flex flex-row">
                  <LineNumbers />
                  <div className="flex-1 min-w-0">
                    <MarkdownComponent>
                      {children}
                    </MarkdownComponent>
                  </div>
                </div>
              </EditorPane>
            </WorkspaceShell>
            <div className="w-full h-5 shrink-0 bg-botbar flex flex-row items-center gap-4 px-4">
              <div className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                <Languages size={14} />
                <LocaleSwitcher />
              </div>
              <div className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                <Scale size={14} />
                <Link href="/imprint">
                  <p className="text-white font-normal">{t('imprint')}</p>
                </Link>
              </div>
              <div className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                <HatGlasses size={14} />
                <Link href="/dataprotection">
                  <p className="text-white font-normal">{t('privacy')}</p>
                </Link>
              </div>
              <div className="flex-1" />
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity max-md:hidden"
              >
                <GitFork size={14} />
                <p className="text-white font-normal">main</p>
                <BookMarked size={14} />
                <p className="text-white font-normal whitespace-nowrap">github.com/Rageus/portfolio</p>
              </a>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
