'use client';

/* * */

import { WebsiteViewport } from '@/src/components/viewport/WebsiteViewport';
import { ThemeProviders } from '@/src/providers/theme-providers';
import { websiteTheme } from '@/src/themes/website/website.theme';
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
