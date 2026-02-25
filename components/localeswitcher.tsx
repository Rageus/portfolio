"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";


export default function LocaleSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	console.log(locale);

	const switchLocale = (newLocale: string) => {
		if (newLocale !== locale) {
			router.replace(pathname, { locale: newLocale });
			router.refresh();
		}
	};

	return (
		<select
			value={locale}
			onChange={e => switchLocale(e.target.value)}
			className="bg-set-100 text-white rounded py-0.5 cursor-pointer"
		>
			<option value="en" className="bg-files text-white">English</option>
			<option value="de" className="bg-files text-white">Deutsch</option>
		</select>
	)
}