'use client';

/* * */

import { useTranslations } from 'next-intl';
import { Tooltip, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

/* * */

export default function BackofficeWrapperButtonDelete({ isLoading, onClick }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('BackofficeWrapperButtonDelete');

  //
  // B. Render components

  return (
    <Tooltip label={isLoading ? t('loading') : t('label')} color="red" position="bottom" withArrow>
      <ActionIcon size="lg" color="red" variant="light" loading={isLoading} onClick={onClick}>
        <IconTrash size={20} />
      </ActionIcon>
    </Tooltip>
  );

  //
}
