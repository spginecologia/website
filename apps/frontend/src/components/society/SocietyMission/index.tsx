'use client';

/* * */

import { Section } from '@/components/common/Section';
import { Image, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function SocietyMission({ withTopSpacer = false }) {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Section withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
				<Title id={styles.title} order={1}>{t('society.SocietyMission.title')}</Title>
				<div className={styles.grid}>
					<div className={styles.cellA}>
						<Title className={styles.whiteText} order={2}>{t('society.SocietyMission.subtitle')}</Title>
						<Text className={styles.whiteText}>{t('society.SocietyMission.paragraph_1')}</Text>
						<Text className={styles.whiteText}>{t('society.SocietyMission.paragraph_2')}</Text>
					</div>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
					<div className={styles.cellC}>
						<Text className={styles.whiteText}>{t('society.SocietyMission.paragraph_3')}</Text>
						<Text className={styles.whiteText}>{t('society.SocietyMission.paragraph_3_points.1')}</Text>
						<Text className={styles.whiteText}>{t('society.SocietyMission.paragraph_3_points.2')}</Text>
						<Text className={styles.whiteText}>{t('society.SocietyMission.paragraph_3_points.3')}</Text>
						<Text className={styles.whiteText}>{t('society.SocietyMission.paragraph_3_points.4')}</Text>
						<Text className={styles.whiteText}>{t('society.SocietyMission.paragraph_3_points.5')}</Text>
						<Text className={styles.whiteText}>{t('society.SocietyMission.paragraph_3_points.6')}</Text>
					</div>
				</div>
			</Section>
		</div>
	);

	//
}
