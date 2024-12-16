'use client';

/* * */

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

export default function BackofficeWrapperButtonCreate({ isLoading, onClick }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('BackofficeWrapperButtonCreate');

	//
	// B. Render components

	return (
		<Tooltip label={isLoading ? t('loading') : t('label')} onClick={onClick} position="bottom" withArrow>
			<ActionIcon color="gray" loading={isLoading} size="lg" variant="subtle">
				<IconPlus size={20} />
			</ActionIcon>
		</Tooltip>
	);

	//
}
