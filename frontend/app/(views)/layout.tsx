/* * */

import { availableFormats } from '@/i18n/config';
import { ConfigProviders } from '@/providers/config-providers';
import { DM_Serif_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

/* * */

const dmSerifDisplay = DM_Serif_Display({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-dm-serif-display',
	weight: ['400'],
});

/* * */

export const metadata = {
	description: '',
	metadataBase: process.env.VERCEL_URL ? new URL(`https://${process.env.VERCEL_URL}`) : new URL(`http://0.0.0.0:${process.env.PORT || 3000}`),
	title: 'SPG | Sociedade Portuguesa de Ginecologia',
};

/* * */

export default async function RootLayout({ children }) {
	//

	//
	// A. Fetch data

	const locale = await getLocale();
	const messages = await getMessages();

	//
	// B. Render components

	return (
		<html className={dmSerifDisplay.variable} lang={locale}>
			<head>
				<meta content="transparent" name="theme-color" />
				<link href="https://use.typekit.net/xgs1heq.css" rel="stylesheet" />
			</head>
			<body>
				<NextIntlClientProvider
					formats={availableFormats}
					locale={locale}
					messages={messages}
				>
					<NuqsAdapter>
						<ConfigProviders>
							{children}
						</ConfigProviders>
					</NuqsAdapter>
				</NextIntlClientProvider>
			</body>
		</html>
	);

	//
}
