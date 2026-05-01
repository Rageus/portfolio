"use client";

import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function ClickableSection({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative block w-full cursor-pointer transition-colors hover:bg-file-hover no-underline hover:no-underline text-inherit hover:text-inherit visited:text-inherit"
    >
      <ArrowUpRight
        className="absolute top-2 right-2 text-britty-font transition-all duration-200 group-hover:text-britty-highlight group-hover:scale-125"
        size={16}
      />
      {children}
    </Link>
  );
}
