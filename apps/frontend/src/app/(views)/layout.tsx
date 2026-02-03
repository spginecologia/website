/* * */

import { ConfigProviders } from '@/providers/config-providers';
import { I18nProvider } from '@/providers/I18nProvider';
import { DM_Serif_Display } from 'next/font/google';
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
	return (
		<html className={dmSerifDisplay.variable} lang="pt">
			<head>
				<meta content="SPG" name="apple-mobile-web-app-title" />
				<meta content="transparent" name="theme-color" />
				<link href="https://use.typekit.net/xgs1heq.css" rel="stylesheet" />
			</head>
			<body>
				<NuqsAdapter>
					<ConfigProviders>
						{children}
					</ConfigProviders>
				</NuqsAdapter>
			</body>
		</html>
	);
}
