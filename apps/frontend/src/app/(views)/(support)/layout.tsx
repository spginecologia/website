'use client';

/* * */

import { SupportViewport } from '@/components/viewport/SupportViewport';
import { ThemeProviders } from '@/providers/theme-providers';
import theme from '@/themes/theme';
import { Notifications } from '@mantine/notifications';

/* * */

export default function Providers({ children }) {
	return (
		<ThemeProviders themeData={theme}>
			<Notifications styles={{ root: { marginTop: '60px' } }} />
			<SupportViewport>
				{children}
			</SupportViewport>
		</ThemeProviders>
	);
}
