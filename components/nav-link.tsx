"use client";

import { Link, usePathname } from "@/i18n/navigation";

export default function NavLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode; }) {
	const pathname = usePathname();
	const background = pathname === href ? "bg-file-selected" : "hover:bg-file-hover transition-colors";

	return (
		<Link href={href} className={`flex flex-row items-center gap-1.5 cursor-pointer ${background} ${className ?? ""}`}>
			{children}
		</Link>
	);
}