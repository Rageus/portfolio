import { ReactNode } from "react";

export default function MarkdownComponent({ children }: { children: ReactNode }) {
	return (
		<div className="w-full prose max-w-none pl-4 pt-4 pb-12 pr-8 text-britty-font prose-p:mt-0 prose-p:mb-7 prose-ul:mt-0 prose-ul:mb-7 prose-ol:mt-0 prose-ol:mb-7 prose-li:my-0 prose-a:text-britty-highlight prose-headings:mt-0 prose-headings:mb-0 prose-headings:font-semibold prose-headings:text-britty-highlight prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
			{children}
		</div>
	)
}