"use client";

import { Link } from "@/i18n/navigation";

export default function ClickableSection({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const classes =
    "block w-full cursor-pointer transition-colors hover:bg-file-hover no-underline hover:no-underline text-inherit hover:text-inherit visited:text-inherit";

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
