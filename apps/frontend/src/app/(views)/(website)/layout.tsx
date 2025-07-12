'use client';

/* * */

import { WebsiteViewport } from '@/components/viewport/WebsiteViewport';
import { ThemeProviders } from '@/providers/theme-providers';
import { websiteTheme } from '@/themes/website/website.theme';
import { Notifications } from '@mantine/notifications';

/* * */

export default function Providers({ children }) {
	return (
		<ThemeProviders themeData={websiteTheme}>
			<Notifications styles={{ root: { marginTop: '60px' } }} />
			<WebsiteViewport>
				{children}
			</WebsiteViewport>
		</ThemeProviders>
	);
}
