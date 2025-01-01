'use client';

/* * */

import { useRowLabel } from '@payloadcms/ui';

/* * */

export const SocialBodyRowLabel = () => {
	//

	const { data } = useRowLabel<{ name: string }>();

	return data.name || 'Membro sem nome';

	//
};
