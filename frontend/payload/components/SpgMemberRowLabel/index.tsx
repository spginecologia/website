'use client';

/* * */

import { useRowLabel } from '@payloadcms/ui';

/* * */

export const SpgMemberRowLabel = () => {
	//

	const { data } = useRowLabel<{ name: string, position: string, separated_from_next: boolean }>();

	if (!data) {
		return '---';
	}

	const name = data.name || 'Membro sem nome';
	const position = data.position || ' - ';
	const separatedFromNext = data.separated_from_next ? '•' : '';

	return `${name} (${position}) ${separatedFromNext}`.trim();

	//
};
