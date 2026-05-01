import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { HatGlasses, Scale, GitFork, BookMarked, Languages, ArrowBigRight, FolderOpen, FileBraces, AtSign, LetterText, Mail, BrainCircuit, Brain, BotMessageSquare } from 'lucide-react';
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import MarkdownComponent from "@/components/markdown";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LocaleSwitcher from "@/components/localeswitcher";
import NavLink from "@/components/nav-link";
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

//Metadata only work on Server components, might improve SEO
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

  setRequestLocale(locale)

  const t = await getTranslations('layout') 

  return (
    <html lang={`${locale}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <div className="flex flex-col w-full h-screen max-h-screen min-h-0 overflow-hidden">
            <div className="flex flex-1 min-h-0 flex-row w-full">
              <div className="flex flex-col w-60 shrink-0 bg-files">
                <div className="flex flex-col w-60 shrink-0 gap-2 bg-files">
                  <div className="flex flex-row items-center gap-1.5 cursor-pointer">
                    <p className="text-britty-highlight px-3 text-xl font-bold">Rasmus Dießel</p>
                  </div>
                  <div className="flex flex-row items-center gap-1.5 cursor-pointer">
                    <p className="text-britty-highlight px-3 font-normal">{t('title')}</p>
                  </div>
                  {/* <div className="flex flex-row items-center gap-1.5 cursor-pointer">
                    <p className="text-britty-font px-3 font-normal">{t('description')}</p>
                  </div> */}
                </div>
                <div className="h-4 shrink-0" aria-hidden />
                <NavLink href="/" className="px-3">
                  <FileBraces size={14} />
                  <p className="text-britty-highlight font-normal">{t('about')}</p>
                </NavLink>
                {/* <div className="flex flex-row px-3 items-center gap-1.5 cursor-pointer">
                  <FolderOpen size={14} />
                  <p className="text-britty-highlight font-normal">{t('projects')}</p>
                </div>
                <NavLink href="/projects/athenegpt" className="px-8">
                  <FileBraces size={14} />
                  <p className="text-britty-highlight font-normal">Athene GPT</p>
                </NavLink>
                <NavLink href="/projects/hotreload" className="px-8">
                  <FileBraces size={14} />
                  <p className="text-britty-highlight font-normal">Hot Reload</p>
                </NavLink>
                <NavLink href="/projects/mobileminigames" className="px-8">
                  <FileBraces size={14} />
                  <p className="text-britty-highlight font-normal">Mobile Minigames</p>
                </NavLink> */}
                {/* <div className="flex flex-row px-3 items-center gap-1.5 cursor-pointer">
                  <FolderOpen size={14} />
                  <p className="text-britty-highlight font-normal">{t('projects')}</p>
                </div>
                <div className="flex flex-row px-8 items-center gap-1.5 cursor-pointer">
                  <FileBraces size={14} />
                  <p className="text-britty-highlight font-normal">game 1</p>
                </div>
                <div className="flex flex-row px-8 items-center gap-1.5 cursor-pointer">
                  <FileBraces size={14} />
                  <p className="text-britty-highlight font-normal">game 2</p>
                </div>
                <div className="flex flex-row px-8 items-center gap-1.5 cursor-pointer">
                  <FileBraces size={14} />
                  <p className="text-britty-highlight font-normal">AI bot</p>
                </div> */}
                <div className="flex flex-row px-3 items-center gap-1.5 cursor-pointer">
                  <FolderOpen size={14} />
                  <p className="text-britty-highlight font-normal">{t('contact')}</p>
                </div>
                <NavLink href="/contact" className="px-8">
                  <Mail size={14} />
                  <p className="text-britty-highlight font-normal">{t('email')}</p>
                </NavLink>
                {/* <Link href="/assistent" className="flex flex-row items-center px-8 gap-1.5 cursor-pointer">
                  <BotMessageSquare size={14} />
                  <p className="text-britty-highlight font-normal">{t('assistent')}</p> 
                </Link> */}
                <a href={LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center px-8 gap-1.5 cursor-pointer hover:bg-file-hover transition-colors"
                >
                  <span className="ml-px block">
                    <Image src="/LinkedIn.svg" alt="LinkedIn" width={14} height={14} />
                  </span>
                  <p className="text-britty-highlight font-normal">LinkedIn</p>
                </a>
                <a href={GITHUB_REPO_URL}
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
              <div className="min-h-0 flex-1 overflow-auto bg-script">
                <MarkdownComponent>
                  {children}
                </MarkdownComponent>
              </div>
            </div>
            <div className="w-full h-5 shrink-0 bg-botbar flex flex-row items-center gap-4 px-4 border border-solid border-set-100">
              <div className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                <Scale size={14} />
              <Link href={"/imprint"}>
                <p className="text-white font-normal">{t('imprint')}</p>
              </Link>
              </div>
              <div className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                <HatGlasses size={14} />
                <Link href={"/dataprotection"}>
                  <p className="text-white font-normal">{t('privacy')}</p>
                </Link>
              </div>
              <div className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                <Languages size={14} />
                <LocaleSwitcher />
              </div>
              <a href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-row items-center justify-end gap-1.5 cursor-pointer hover:opacity-80 transition-opacity max-md:hidden"
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
