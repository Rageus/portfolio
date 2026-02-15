import MyMarkdown from "./mymarkdown.mdx";
 
export default async function Contact() {
	return (
		<div className="flex flex-col w-full h-screen">
			<div className="flex flex-row w-full h-15 shrink-0 bg-neutral-800 items-center gap-6 px-4 border-2 border-solid border-amber-50">
				<p className="text-white text-3xl font-normal font-['Inter']">Home</p>
				<p className="text-white text-3xl font-normal font-['Inter']">Projects</p>
				<p className="text-white text-3xl font-normal font-['Inter']">Contact</p>
			</div>
			<div className="flex flex-1 min-h-0 flex-row w-full bg-stone-500">
				<div className="flex flex-col w-120 shrink-0 bg-blue-500">
					<p className="text-white text-3xl font-normal font-['Inter']">mobileminigames.cs</p>
					<p className="text-white text-3xl font-normal font-['Inter']">hotreload.cs</p>
					<p className="text-white text-3xl font-normal font-['Inter']">athenegpt.go</p>
				</div>
				<div className="min-h-0 flex-1 overflow-auto bg-stone-500">
					<div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
						<MyMarkdown/>
					</div>
				</div>
			</div>
			<div className="w-full h-10 shrink-0 bg-neutral-800 flex flex-row items-center gap-6 px-4 border-2 border-solid border-amber-50">
				<p className="text-white text-2xl font-normal font-['Inter']">Impressum</p>
				<p className="text-white text-2xl font-normal font-['Inter']">Privacy Policy</p>
			</div>
		</div>
	);
}