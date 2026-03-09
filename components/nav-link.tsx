"use client";

import { Link, usePathname } from "@/i18n/navigation";

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
	const pathname = usePathname();
	const background = pathname === href ? "bg-file-selected" : "hover:bg-file-hover transition-colors";

	return (
		<Link href={href} className={`flex flex-row px-3 items-center gap-1.5 cursor-pointer ${background}`}>
			{children}
		</Link>
	);
}