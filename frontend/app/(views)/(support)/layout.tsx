'use client';

/* * */

import { SupportViewport } from '@/components/viewport/SupportViewport';
import { ThemeProviders } from '@/providers/theme-providers';
import { supportTheme } from '@/themes/support/support.theme';
import { Notifications } from '@mantine/notifications';

/* * */

export default function Providers({ children }) {
	return (
		<ThemeProviders themeData={supportTheme}>
			<Notifications styles={{ root: { marginTop: '60px' } }} />
			<SupportViewport>
				{children}
			</SupportViewport>
		</ThemeProviders>
	);
}
