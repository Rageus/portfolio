import { ReactNode } from "react";

export default function MarkdownComponent({ children }: { children: ReactNode }) {
	return (
		<div className="w-full h-full prose max-w-none text-britty-font prose-a:text-britty-highlight prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-britty-highlight prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
			{children}
		</div>
	)
}