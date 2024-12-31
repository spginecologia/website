'use client';

/* * */

import { MantineProvider, MantineProviderProps } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import 'dayjs/locale/pt';
import { DatesProviderValue } from 'node_modules/@mantine/dates/lib/components/DatesProvider/DatesProvider';

/* * */

interface Props {
	children: React.ReactNode
	themeData: MantineProviderProps['theme']
}

/* * */

export function ThemeProviders({ children, themeData }: Props) {
	//

	//
	// A. Setup variables

	const mantineDatesSettings: Partial<DatesProviderValue> = {
		firstDayOfWeek: 1,
		locale: 'pt',
		timezone: 'Europe/Lisbon',
		weekendDays: [6, 0],
	};

	//
	// B. Render components

	return (
		<MantineProvider defaultColorScheme="auto" theme={themeData}>
			<DatesProvider settings={mantineDatesSettings}>
				<ModalsProvider>
					{children}
				</ModalsProvider>
			</DatesProvider>
		</MantineProvider>
	);

	//
}
