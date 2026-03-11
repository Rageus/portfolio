 'use client';

import { useTranslations } from 'next-intl';

export default function ContactForm() {
	const t = useTranslations('contact');

	return (
		<form action={submitContact} className="flex flex-1 flex-col gap-5 justify-center items-center">
			<div className="text-britty-font text-5xl font-bold">{t('header')}</div>
			<div className="flex gap-3">
				<input
					id="name"
					name="name"
					type="text"
					placeholder={`${t('name')}...`}
					className="w-[45%] flex-1 bg-script text-foreground border border-file-selected rounded px-3 py-2 placeholder:text-britty-font focus:outline-none focus:ring-2 focus:ring-botbar"
				/>
				<input
					id="email"
					name="email"
					type="email"
					placeholder={`${t('email')}...`}
					className="w-[45%] flex-1 bg-script text-foreground border border-file-selected rounded px-3 py-2 placeholder:text-britty-font focus:outline-none focus:ring-2 focus:ring-botbar"
				/>
			</div>
			<input
				id="subject"
				name="subject"
				type="text"
				placeholder={`${t('subject')}...`}
				className="w-full bg-script text-foreground border border-file-selected rounded px-3 py-2 placeholder:text-britty-font focus:outline-none focus:ring-2 focus:ring-botbar"
			/>
			<textarea
				id="message"
				name="message"
				placeholder={`${t('message')}...`}
				rows={5}
				className="w-full bg-script text-foreground border border-file-selected rounded px-3 py-2 placeholder:text-britty-font focus:outline-none focus:ring-2 focus:ring-botbar"
			/>
			<button
				type="submit"
				className="w-full bg-botbar text-white rounded px-4 py-2 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-botbar focus:ring-offset-2 focus:ring-offset-background"
			>
				{t('button-text')}
			</button>
		</form>
	)
}

async function submitContact(formData: FormData) {
	const body = {
		name: formData.get('name'),
		email: formData.get('email'),
		subject: formData.get('subject'),
		message: formData.get('message'),
	}
	;
	await fetch('/api/emails', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
}