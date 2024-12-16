'use client';

/* * */

import { ActionIcon, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './SearchField.module.css';

/* * */

export default function SearchField({ onChange, placeholder, query }) {
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
				leftSection={<IconSearch size={16} />}
				onChange={handleChange}
				placeholder={placeholder || t('placeholder')}
				value={query}
				rightSection={
					query && (
						<ActionIcon color="gray" onClick={handleClear} variant="subtle">
							<IconX size={16} />
						</ActionIcon>
					)
				}
			/>
		</div>
	);

	//
}
