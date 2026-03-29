import type { ContactFieldKey } from '@/lib/contact-zod-issue-message';
import type { ReactNode } from 'react';

export const contactInputBase =
	'bg-script text-foreground rounded px-3 py-2 placeholder:text-britty-font focus:outline-none focus:ring-2';
export const contactInputOk = 'border border-file-selected focus:ring-botbar';
export const contactInputErr = 'border border-red-500 focus:ring-red-500';

export function FieldStatusLine({
	field,
	invalid,
	errorLabel,
}: {
	field: ContactFieldKey;
	invalid: boolean;
	errorLabel: string;
}) {
	const statusId = `${field}-status`;
	return (
		<p
			id={statusId}
			role={invalid ? 'alert' : undefined}
			aria-hidden={!invalid}
			className={`mt-0.5 text-left text-xs mx-0.5 min-h-lh ${
				invalid ? 'text-red-500' : 'invisible'
			}`}
		>
			{invalid ? errorLabel : '\u00a0'}
		</p>
	);
}

export function ContactFieldColumn({
	className,
	field,
	error,
	children,
}: {
	className: string;
	field: ContactFieldKey;
	error: string | undefined;
	children: ReactNode;
}) {
	return (
		<div className={className}>
			{children}
			<FieldStatusLine field={field} invalid={!!error} errorLabel={error ?? ''} />
		</div>
	);
}
