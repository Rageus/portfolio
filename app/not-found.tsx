
import "./globals.css";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
	const t = await getTranslations("notFound");

	return (
		<div className="bg-script flex flex-col items-center justify-start w-full h-screen max-h-screen min-h-0 overflow-hidden pt-[25vh]">
			<div className="text-center">
				<h1 className="text-5xl text-britty-font">
					{t("title")}
				</h1>
				<p className="text-xl text-britty-font">
					{t("description")}
				</p>
				<a href="/" className="text-[#42ffca] underline">
					{t("backHome")}
				</a>
			</div>
		</div>
	);
}