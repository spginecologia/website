'use client';

/* * */

import { WebsiteViewport } from '@/components/viewport/WebsiteViewport';
import { ConfigProviders } from '@/providers/config-providers';
import { ThemeProviders } from '@/providers/theme-providers';
import { websiteTheme } from '@/themes/website/website.theme';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';

/* * */

export default function Providers({ children, session }) {
	return (
		<SessionProvider refetchInterval={5} session={session}>
			<ConfigProviders>
				<ThemeProviders themeData={websiteTheme}>
					<Notifications styles={{ root: { marginTop: '60px' } }} />
					<WebsiteViewport>
						{children}
					</WebsiteViewport>
				</ThemeProviders>
			</ConfigProviders>
		</SessionProvider>
	);
}
