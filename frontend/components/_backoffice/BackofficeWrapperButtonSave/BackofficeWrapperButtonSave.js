'use client';

/* * */

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconCloudCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

export default function BackofficeWrapperButtonSave({ isDirty, isLoading, isValid, onClick }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('BackofficeWrapperButtonSave');

	//
	// B. Render components

	if (!isDirty) {
		return (
			<Tooltip color="green" label={t('up_to_date')} position="bottom" withArrow>
				<ActionIcon color="green" size="lg" variant="transparent">
					<IconCloudCheck size={22} />
				</ActionIcon>
			</Tooltip>
		);
	}

	if (isDirty && !isValid) {
		return (
			<Tooltip color="orange" label={t('invalid')} position="bottom" withArrow>
				<ActionIcon color="orange" size="lg" variant="filled" disabled>
					<IconDeviceFloppy size={20} />
				</ActionIcon>
			</Tooltip>
		);
	}

	if (isDirty && isValid) {
		return (
			<Tooltip color="green" label={isLoading ? t('loading') : t('label')} position="bottom" withArrow>
				<ActionIcon color="green" loading={isLoading} onClick={onClick} size="lg" variant="light">
					<IconDeviceFloppy size={20} />
				</ActionIcon>
			</Tooltip>
		);
	}

	//
}
