/* * */

import { Section } from '@/components/common/Section';
import { Image, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function SectionsIntro() {
	//

	//
	// A. Setup variables

	const t = useTranslations('sections.SectionsIntro');

	//
	// B. Render components

	return (
		<Section>
			<div className={styles.grid}>
				<div className={styles.cellA}>
					<Title id={styles.title} order={2}>{t('title')}</Title>
					<Text>{t('paragraph_1')}</Text>
				</div>
				<Image src="/generic/seccoes-e-nucleos.png" />
			</div>
		</Section>
	);

	//
}
