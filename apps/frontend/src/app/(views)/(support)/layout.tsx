'use client';

/* * */

import { SupportViewport } from '@/src/components/viewport/SupportViewport';
import { ThemeProviders } from '@/src/providers/theme-providers';
import { supportTheme } from '@/src/themes/support/support.theme';
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
