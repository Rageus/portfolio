"use client";

import { Link } from "@/i18n/navigation";
import { useEditorTabs } from "./editor-tabs-context";

export default function NavLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode; }) {
	const { activePath, openTab } = useEditorTabs();
	const background = activePath === href ? "bg-file-selected" : "hover:bg-file-hover transition-colors";

	return (
		<Link
			href={href}
			onClick={() => openTab(href)}
			className={`flex flex-row items-center gap-1.5 cursor-pointer ${background} ${className ?? ""}`}
		>
			{children}
		</Link>
	);
}
