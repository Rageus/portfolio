'use client';

import {
	ContactFieldColumn,
	contactInputBase,
	contactInputErr,
	contactInputOk,
} from './contact-field-column';
import { CONTACT_FIELD_LIMITS, contactEmailSchema } from '@/lib/contact-email-schema';
import {
	CONTACT_FIELD_KEYS,
	type ContactFieldKey,
	contactZodIssueToMessage,
	firstIssuePerContactField,
} from '@/lib/contact-zod-issue-message';
import { CONTACT_EMAIL } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import { useState, type SubmitEvent } from 'react';

const submitBtnBase =
	'w-full rounded px-4 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';
const submitBtnDefault = `${submitBtnBase} bg-botbar hover:opacity-90 focus:ring-botbar disabled:cursor-wait disabled:opacity-90`;
const submitBtnSuccess = `${submitBtnBase} bg-green-700 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-100`;

export default function ContactForm() {
	const t = useTranslations('contact');
	const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success'>('idle');
	const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactFieldKey, string>>>({});

	function fieldClass(field: ContactFieldKey, widthClass: string) {
		return `${widthClass} ${contactInputBase} ${fieldErrors[field] ? contactInputErr : contactInputOk}`;
	}

	function clearFieldError(field: ContactFieldKey) {
		setFieldErrors((prev) => {
			const next = { ...prev };
			delete next[field];
			return next;
		});
	}

	async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		if (submitState === 'success') return;

		const form = e.currentTarget;
		const formData = new FormData(form);
		const body = {
			name: String(formData.get('name') ?? ''),
			email: String(formData.get('email') ?? ''),
			subject: String(formData.get('subject') ?? ''),
			message: String(formData.get('message') ?? ''),
		};

		const parsed = contactEmailSchema.safeParse(body);
		if (!parsed.success) {
			const firstByField = firstIssuePerContactField(parsed.error.issues);
			const next: Partial<Record<ContactFieldKey, string>> = {};
			for (const key of CONTACT_FIELD_KEYS) {
				const issue = firstByField[key];
				if (issue) {
					next[key] = contactZodIssueToMessage(issue, t);
				}
			}
			setFieldErrors(next);
			return;
		}

		setFieldErrors({});
		setSubmitState('submitting');
		try {
			const res = await fetch('/api/emails', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(parsed.data),
			});
			if (res.ok) {
				setSubmitState('success');
			} else {
				const text = await res.text();
				console.error('[Contact form] API error:', res.status, res.statusText, text);
				setSubmitState('idle');
			}
		} catch (err) {
			console.error('[Contact form] Request failed:', err);
			setSubmitState('idle');
		}
	}

	const isSuccess = submitState === 'success';
	const isBusy = submitState === 'submitting';

	function fieldAria(field: ContactFieldKey) {
		const statusId = `${field}-status`;
		const invalid = !!fieldErrors[field];
		return {
			'aria-errormessage': invalid ? statusId : undefined,
		};
	}

	return (
		<form
			noValidate
			onSubmit={handleSubmit}
			className="flex flex-1 flex-col gap-0 justify-center items-center"
		>
			<div className="flex w-full flex-col gap-5">
				<div className="text-britty-font text-5xl font-bold">{t('header')}</div>
				<div className="w-full flex gap-1">
					<ContactFieldColumn
						className="flex min-w-0 w-[45%] flex-1 flex-col gap-0"
						field="name"
						error={fieldErrors.name}
					>
						<input
							id="name"
							name="name"
							type="text"
							maxLength={CONTACT_FIELD_LIMITS.name.max}
							placeholder={`${t('name')}...`}
							aria-invalid={!!fieldErrors.name}
							{...fieldAria('name')}
							onChange={() => clearFieldError('name')}
							className={fieldClass('name', 'w-full')}
						/>
					</ContactFieldColumn>
					<ContactFieldColumn
						className="flex min-w-0 w-[45%] flex-1 flex-col gap-0"
						field="email"
						error={fieldErrors.email}
					>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							maxLength={CONTACT_FIELD_LIMITS.email.max}
							placeholder={`${t('email')}...`}
							aria-invalid={!!fieldErrors.email}
							{...fieldAria('email')}
							onChange={() => clearFieldError('email')}
							className={fieldClass('email', 'w-full')}
						/>
					</ContactFieldColumn>
				</div>
			</div>
			<ContactFieldColumn className="flex w-full flex-col gap-0" field="subject" error={fieldErrors.subject}>
				<input
					id="subject"
					name="subject"
					type="text"
					maxLength={CONTACT_FIELD_LIMITS.subject.max}
					placeholder={`${t('subject')}...`}
					aria-invalid={!!fieldErrors.subject}
					{...fieldAria('subject')}
					onChange={() => clearFieldError('subject')}
					className={fieldClass('subject', 'w-full')}
				/>
			</ContactFieldColumn>
			<ContactFieldColumn className="flex w-full flex-col gap-0" field="message" error={fieldErrors.message}>
				<textarea
					id="message"
					name="message"
					maxLength={CONTACT_FIELD_LIMITS.message.max}
					placeholder={`${t('message')}...`}
					rows={5}
					aria-invalid={!!fieldErrors.message}
					{...fieldAria('message')}
					onChange={() => clearFieldError('message')}
					className={fieldClass('message', 'w-full')}
				/>
			</ContactFieldColumn>
			<button
				type="submit"
				disabled={isSuccess || isBusy}
				className={isSuccess ? submitBtnSuccess : submitBtnDefault}
			>
				{isSuccess ? t('button-done') : t('button-text')}
			</button>
			<p className="w-full text-britty-font text-base text-center">
				{t('email-alt-intro')}{' '}
				<a
					href={`mailto:${CONTACT_EMAIL}`}
					className="text-britty-highlight underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-botbar focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
				>
					{CONTACT_EMAIL}
				</a>
			</p>
		</form>
	);
}
