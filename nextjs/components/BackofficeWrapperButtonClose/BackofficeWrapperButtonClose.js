'use client';

/* * */

import { useTranslations } from 'next-intl';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

/* * */

export default function BackofficeWrapperButtonClose({ isLoading, onClick }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('BackofficeWrapperButtonClose');

  //
  // B. Render components

  return (
    <Tooltip label={isLoading ? t('loading') : t('label')} color="gray" position="bottom" withArrow>
      <ActionIcon size="lg" variant="subtle" color="gray" loading={isLoading} onClick={onClick}>
        <IconX size={20} />
      </ActionIcon>
    </Tooltip>
  );

  //
}
