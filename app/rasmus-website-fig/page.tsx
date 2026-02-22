import MyMarkdown from "./mymarkdown.mdx";
import MarkdownComponent from "./markdown"
import { HatGlasses, Scale, GitFork, BookMarked, Languages } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
 
export default async function Contact() {
	return (
		<div className="flex flex-col w-full h-screen">
			<div className="flex flex-row w-full h-8 shrink-0 bg-topbar items-center gap-6 px-2 border border-solid border-set-100">
				<Image src="/favicon.ico"
					alt="Brand Logo"
					width={24}
					height={24}
					/>
				<p className="text-white font-normal">Home</p>
				<p className="text-white font-normal">Projects</p>
				<p className="text-white font-normal">Contact</p>
			</div>
			<div className="flex flex-1 min-h-0 flex-row w-full">
				<div className="flex flex-col w-60 shrink-0 bg-files">
					<p className="text-white font-normal">mobileminigames.cs</p>
					<p className="text-white font-normal">hotreload.cs</p>
					<p className="text-white font-normal">athenegpt.go</p>
				</div>
				<div className="min-h-0 flex-1 overflow-auto bg-script">
					<MarkdownComponent>
						<MyMarkdown/>
					</MarkdownComponent>
				</div>
			</div>
			<div className="w-full h-5 shrink-0 bg-botbar flex flex-row items-center gap-6 px-4 border border-solid border-set-100">
				<a href="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
				>
					<GitFork size={14}/>
					<p className="text-white font-normal">master</p>
					<BookMarked size={14}/>
					<p className="text-white font-normal">github.com/rasmus-website</p>
				</a> 
				<div className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
					<Languages size={14}/>
					<p className="text-white font-normal">English</p>
				</div>
				<div className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
					<Scale size={14}/>
					<p className="text-white font-normal">Imprint</p>
				</div>
				<div className="flex flex-row items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
					<HatGlasses size={14}/>
					<p className="text-white font-normal">Privacy Policy</p>
				</div>
			</div>
		</div>
	);
}