'use client';

/* * */

import { Section } from '@/components/common/Section';
import { Button, Image, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function BrandAssetsMain({ withTopSpacer = true }) {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Section withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
				<div className={styles.grid}>
					<Image className={styles.logo} fit="contain" src="/brand/spg/spg-logo-vertical.svg" />
					<div className={styles.rightCell}>
						<Title className={styles.titleCell} order={2}>{t('brand.BrandAssetsMain.title')}</Title>
						<Text>{t('brand.BrandAssetsMain.paragraph')}</Text>
						<Button className={styles.upperButton}>{t('brand.BrandAssetsMain.button_1')}</Button>
						<Button className={styles.lowerButton}>{t('brand.BrandAssetsMain.button_2')}</Button>
					</div>
				</div>
			</Section>
		</div>
	);

	//
}
