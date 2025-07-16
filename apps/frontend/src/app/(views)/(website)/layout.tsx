'use client';

/* * */

import { WebsiteViewport } from '@/components/viewport/WebsiteViewport';
import { ThemeProviders } from '@/providers/theme-providers';
import theme from '@/themes/theme';
import { Notifications } from '@mantine/notifications';

/* * */

export default function Providers({ children }) {
	return (
		<ThemeProviders themeData={theme}>
			<Notifications styles={{ root: { marginTop: '60px' } }} />
			<WebsiteViewport>
				{children}
			</WebsiteViewport>
		</ThemeProviders>
	);
}
