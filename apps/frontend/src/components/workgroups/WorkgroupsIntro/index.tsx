/* * */

import { Section } from '@/components/common/Section';
import { Image, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function WorkgroupsIntro() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<Section>
			<div className={styles.grid}>
				<div className={styles.cellA}>
					<Title id={styles.title} order={2}>{t('workgroups.WorkgroupsIntro.title')}</Title>
					<Text>{t('workgroups.WorkgroupsIntro.paragraph')}</Text>
				</div>
				<Image src="/generic/seccoes-e-nucleos.png" />
			</div>
		</Section>
	);

	//
}
