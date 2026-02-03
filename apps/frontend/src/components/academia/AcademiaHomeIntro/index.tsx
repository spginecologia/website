'use client';

/* * */

import { Section } from '@/components/common/Section';
import { Image, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function AcademiaHomeIntro() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation('academia.AcademiaHomeIntro');

	//
	// B. Render components

	return (
		<Section withTopSpacer="transparent">
			<div className={styles.container}>
				<Image src="/brand/academia/academia-intro.svg" />
				<div className={styles.descriptionWrapper}>
					<Title order={2} ta="center">{t('title')}</Title>
					<Image className={styles.academiaLogo} src="/brand/academia/spg-academia-logo.svg" />
					<Text size="lg" ta="center">{t('description')}</Text>
				</div>
			</div>
		</Section>
	);

	//
}
