'use client';

/* * */

import { MantineProvider, MantineProviderProps } from '@mantine/core';
import { DatesProvider, DatesProviderProps } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import 'dayjs/locale/pt';

/* * */

interface ThemeProvidersProps {
	children: React.ReactNode
	themeData: MantineProviderProps['theme']
}

/* * */

export function ThemeProviders({ children, themeData }: ThemeProvidersProps) {
	//

	//
	// A. Setup variables

	const mantineDatesSettings: DatesProviderProps['settings'] = {
		firstDayOfWeek: 1,
		locale: 'pt',
		weekendDays: [6, 0],
	};

	//
	// B. Render components

	return (
		<MantineProvider forceColorScheme="light" theme={themeData}>
			<DatesProvider settings={mantineDatesSettings}>
				<ModalsProvider>
					{children}
				</ModalsProvider>
			</DatesProvider>
		</MantineProvider>
	);

	//
}
