
import "./globals.css";

export default function NotFoundPage() {
	return (
		<div className="bg-script flex flex-col items-center justify-start w-full h-screen max-h-screen min-h-0 overflow-hidden pt-[25vh]">
			<div className="text-center">
				<h1 className="text-5xl text-britty-font">
					404 - Page Not Found
				</h1>
				<p className="text-xl text-britty-font">
					Oops! The page you are looking for does not exist.
				</p>
				<a href="/" className="text-[#42ffca] underline">
					Go back to Home
				</a>
			</div>
		</div>
	);
}