'use client';

/* * */

import '@/i18n/config';
import { LocaleContextProvider } from '@/i18n/LocaleContext';
import { i18nResourceKeysPt } from '@/i18n/resources';
import { SWRConfig, SWRConfiguration } from 'swr';

/* * */

export function ConfigProviders({ children }) {
	//

	//
	// A. Setup variables

	const swrSettings: SWRConfiguration = {
		async fetcher(...args: Parameters<typeof fetch>) {
			const res = await fetch(...args);
			if (!res.ok) {
				const errorDetails = await res.json();
				const error = new Error(errorDetails.message || 'An error occurred while fetching data.');
				const customError = {
					...error,
					description: errorDetails.description || 'No additional information was provided by the API.',
					status: res.status,
				};
				throw customError;
			}
			return res.json();
		},
		refreshInterval: 900000, // 15 minutes
		revalidateOnFocus: true,
		revalidateOnMount: true,
	};

	//
	// B. Render components

	return (
		<SWRConfig value={swrSettings}>
			<LocaleContextProvider i18n={{ pt: i18nResourceKeysPt }}>
				{children}
			</LocaleContextProvider>
		</SWRConfig>
	);

	//
}
