'use client';

/* * */

import styles from './SearchField.module.css';
import { ActionIcon, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

export default function SearchField({ query, onChange, placeholder }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('SearchField');

  //
  // B. Handle actions

  const handleChange = ({ target }) => {
    onChange(target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <TextInput
        value={query}
        placeholder={placeholder || t('placeholder')}
        leftSection={<IconSearch size={16} />}
        onChange={handleChange}
        rightSection={
          query && (
            <ActionIcon color="gray" variant="subtle" onClick={handleClear}>
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />
    </div>
  );

  //
}
