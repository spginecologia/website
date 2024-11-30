'use client';

/* * */

import { useTranslations } from 'next-intl';
import { Tooltip, ActionIcon } from '@mantine/core';
import { IconCloudCheck, IconDeviceFloppy } from '@tabler/icons-react';

/* * */

export default function BackofficeWrapperButtonSave({ isDirty, isValid, isLoading, onClick }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('BackofficeWrapperButtonSave');

  //
  // B. Render components

  if (!isDirty) {
    return (
      <Tooltip label={t('up_to_date')} color="green" position="bottom" withArrow>
        <ActionIcon size="lg" color="green" variant="transparent">
          <IconCloudCheck size={22} />
        </ActionIcon>
      </Tooltip>
    );
  }

  if (isDirty && !isValid) {
    return (
      <Tooltip label={t('invalid')} color="orange" position="bottom" withArrow>
        <ActionIcon size="lg" color="orange" variant="filled" disabled>
          <IconDeviceFloppy size={20} />
        </ActionIcon>
      </Tooltip>
    );
  }

  if (isDirty && isValid) {
    return (
      <Tooltip label={isLoading ? t('loading') : t('label')} color="green" position="bottom" withArrow>
        <ActionIcon size="lg" color="green" variant="light" loading={isLoading} onClick={onClick}>
          <IconDeviceFloppy size={20} />
        </ActionIcon>
      </Tooltip>
    );
  }

  //
}
