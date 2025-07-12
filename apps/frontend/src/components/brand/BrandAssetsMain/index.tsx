/* * */

import { Section } from '@/components/common/Section';
import { Button, Image, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function BrandAssetsMain({ withTopSpacer = true }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('brand.BrandAssetsMain');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Section withPadding withTopSpacer={withTopSpacer ? 'transparent' : 'none'}>
				<div className={styles.grid}>
					<Image className={styles.logo} fit="contain" src="/brand/spg/spg-logo-vertical.svg" />
					<div className={styles.rightCell}>
						<Title className={styles.titleCell} order={2}>{t('title')}</Title>
						<Text>{t('paragraph')}</Text>
						<Button className={styles.upperButton}>{t('button_1')}</Button>
						<Button className={styles.lowerButton}>{t('button_2')}</Button>
					</div>
				</div>
			</Section>
		</div>
	);

	//
}
