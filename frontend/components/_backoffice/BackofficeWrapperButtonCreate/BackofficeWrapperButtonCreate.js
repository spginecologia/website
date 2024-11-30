'use client';

/* * */

import { useTranslations } from 'next-intl';
import { Tooltip, ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

/* * */

export default function BackofficeWrapperButtonCreate({ isLoading, onClick }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('BackofficeWrapperButtonCreate');

  //
  // B. Render components

  return (
    <Tooltip label={isLoading ? t('loading') : t('label')} position="bottom" onClick={onClick} withArrow>
      <ActionIcon size="lg" color="gray" variant="subtle" loading={isLoading}>
        <IconPlus size={20} />
      </ActionIcon>
    </Tooltip>
  );

  //
}
