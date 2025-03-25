/* * */

import { Section } from '@/components/common/Section';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function BrandTypography({ withTopSpacer = true }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('brand.BrandTypography');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Section withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					<div className={styles.lato}>LATO</div>
					<div className={styles.leMonde}>Le Monde Journal</div>
				</div>
			</Section>
		</div>
	);

	//
}
