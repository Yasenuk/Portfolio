import { Resend } from 'resend';

const { RESEND_API_KEY, EMAIL_FROM, NEXT_PUBLIC_APP_URL } = process.env;

if (!RESEND_API_KEY || !EMAIL_FROM || !NEXT_PUBLIC_APP_URL) {
	throw new Error('RESEND_API_KEY, EMAIL_FROM and NEXT_PUBLIC_APP_URL must be set');
}

const resend = new Resend(RESEND_API_KEY);
const API_URL = NEXT_PUBLIC_APP_URL.replace(/\/$/, '');

const DEFAULT_FOOTER = 'This message was sent automatically — no need to reply.';

export function maskEmail(email: string) {
	const [name = '', domain = ''] = email.split('@');
	const head = name.slice(0, 2);
	const stars = '*'.repeat(Math.max(name.length - head.length, 3));

	return `${head}${stars}@${domain}`;
}

interface Template {
	to: string;
	subject: string;
	heading: string;
	lines: string[];
	action?: {
		href: string;
		label: string;
	};
	footer: string;
}

function renderHTML({ heading, lines, action, footer }: Template) {
	const paragraphs = lines
		.map((line) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#c9c9c9;">${line}</p>`)
		.join('');
	
	const button = action
		? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0;">
			<tr>
				<td style="border-radius:6px;background:#a259ff;">
					<a
						href="${action.href}"
          	style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;
            color:#ffffff;text-decoration:none;"
					>
						${action.label}
					</a>
				</td>
			</tr>
		</table>
		<p style="margin:0 0 16px;font-size:13px;line-height:1.6;color:#8a8a8a;word-break:break-all;">
			If the button doesn't work, copy this link:<br />${action.href}
		</p>`
		: '';
	
	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
	</head>
	<body style="margin:0;pedding:0;background:#121212;">
		<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#121212;padding:40px 16px;">
			<tr>
				<td align="center">
					<table
						role="presentation"
						cellpadding="0"
						cellspacing="0"
						width="100%"
						style="max-width:520px;background:#1e1e1e;border-radius:12px;padding:36px;
						font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;"
					>
						<tr>
							<td>
								<h1 style="margin:0 0 20px;font-size:20px;font-weight:600;color:#ffffff;">${heading}</h1>
								${paragraphs}
								${button}
								<hr style="border:none;border-top:1px solid #2f2f2f;margin:28px 0 16px;" />
								<p style="margin:0;font-size:12px;line-height:1.6;color:#6f6f6f;">${footer}</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>`;
}

function renderText({ heading, lines, action, footer }: Template) {
	const stripped = lines.map(line => line.replace(/<[^>]+>/g, ''));

	return [
		heading,
		'',
		...stripped,
		action ? `\n${action.href}: ${action.href}` : '',
		'',
		footer
	].filter(Boolean).join('\n');
}

async function send(template: Template) {
	const { data, error } = await resend.emails.send({
		from: EMAIL_FROM!,
		to: template.to,
		subject: template.subject,
		html: renderHTML(template),
		text: renderText(template),
	});

	if (error)
		throw new Error(`Resend failed [${error.statusCode}]: ${error.name} - ${error.message}`);

	return data;
}

export function sendEmailChangeConfirmation(newEmail: string, token: string) {
	return send({
		to: newEmail,
		subject: 'Confirm your new email address',
		heading: 'Confirm your new email',
		lines: [
			'This address was set as the new email for an account. Confirm it with the button below to finish the change.',
			'The link is valid for <strong>30 minutes</strong> and works only once.',
			'If this wasn\'t you, just delete this message — nothing will change.',
		],
		action: {
			href: `${API_URL}/confirm-email?token=${encodeURIComponent(token)}`,
			label: 'Confirm address',
		},
		footer: DEFAULT_FOOTER,
	});
}

export function sendEmailTakenWarning(email: string) {
	return send({
		to: email,
		subject: 'Someone tried to use your email address',
		heading: 'Someone tried to link your email',
		lines: [
			'Someone attempted to set this address as the email for a different account.',
			'Nothing changed — the address still belongs to your account.',
			'If this wasn\'t you, your access is safe, but it\'s worth reviewing your password.',
		],
		action: {
			href: `${API_URL}/profile/security`,
			label: 'Review security',
		},
		footer: DEFAULT_FOOTER,
	});
}

export function sendEmailChangeRequested(currentEmail: string, newEmail: string) {
	return send({
		to: currentEmail,
		subject: 'Email change requested',
		heading: 'An email change was requested',
		lines: [
			`A change of your account email to <strong>${maskEmail(newEmail)}</strong> was requested.`,
			'If this was you, confirm it using the message sent to the new address.',
			'If not, <strong>change your password immediately</strong>. Until the change is confirmed, the account stays on this address.',
		],
		action: {
			href: `${API_URL}/profile/security`,
			label: 'Change password',
		},
		footer: DEFAULT_FOOTER,
	});
}

export function sendEmailChanged(previousEmail: string, newEmail: string) {
	return send({
		to: previousEmail,
		subject: 'Your account email was changed',
		heading: 'Account email changed',
		lines: [
			`The account email was changed to <strong>${maskEmail(newEmail)}</strong>. This address is no longer linked to the account.`,
			'All active sessions were ended — signing in again requires the new address.',
			'If this wasn\'t you, contact support as soon as possible. This is the last message sent to this address.',
		],
		footer: DEFAULT_FOOTER,
	});
}

export function sendPasswordChanged(email: string) {
	return send({
		to: email,
		subject: 'Your password was changed',
		heading: 'Your account password was changed',
		lines: [
			'The password was just changed. All other sessions have been ended.',
			'If this wasn\'t you, recover access via "Forgot password" and review your active sessions.',
		],
		action: {
			href: `${API_URL}/profile/sessions`,
			label: 'View sessions',
		},
		footer: DEFAULT_FOOTER,
	});
}