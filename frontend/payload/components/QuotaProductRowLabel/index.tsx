'use client';

/* * */

import { useRowLabel } from '@payloadcms/ui';

/* * */

export const QuotaProductRowLabel = () => {
	//

	const { data } = useRowLabel<{ is_enabled: string, title: string }>();

	if (!data) {
		return '---';
	}

	const title = data.title || 'Quota sem título';
	const isEnabled = data.is_enabled ? 'ON' : 'OFF';

	return `${title} (${isEnabled})`;

	//
};
