'use client';

/* * */

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

export default function BackofficeWrapperButtonClose({ isLoading, onClick }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('BackofficeWrapperButtonClose');

	//
	// B. Render components

	return (
		<Tooltip color="gray" label={isLoading ? t('loading') : t('label')} position="bottom" withArrow>
			<ActionIcon color="gray" loading={isLoading} onClick={onClick} size="lg" variant="subtle">
				<IconX size={20} />
			</ActionIcon>
		</Tooltip>
	);

	//
}
