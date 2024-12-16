'use client';

/* * */

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

export default function BackofficeWrapperButtonDelete({ isLoading, onClick }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('BackofficeWrapperButtonDelete');

	//
	// B. Render components

	return (
		<Tooltip color="red" label={isLoading ? t('loading') : t('label')} position="bottom" withArrow>
			<ActionIcon color="red" loading={isLoading} onClick={onClick} size="lg" variant="light">
				<IconTrash size={20} />
			</ActionIcon>
		</Tooltip>
	);

	//
}
