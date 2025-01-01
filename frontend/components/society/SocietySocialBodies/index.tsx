/* * */

import { Section } from '@/components/common/Section';
import { Image, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function SocietySocialBodies({ withTopSpacer = false }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('society.SocietySocialBodies');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Section topSpacerType={withTopSpacer ? 'transparent' : 'none'}>

				<Title order={1}>{t('title')}</Title>
				<Image src="/generic/orgaos-sociais-spg-2023.jpg" />

				<div className={styles.grid}>

					<div className={styles.columnA}>
						<div className={styles.orgGroup}>
							<Title className={styles.orgGroupTitle} order={2}>{t('org.direction.title')}</Title>
							<Text>member</Text>
						</div>
					</div>

					<div className={styles.columnB}>
						<div className={styles.orgGroup}>
							<Title className={styles.orgGroupTitle} order={2}>{t('org.general_assembly.title')}</Title>
							<Text>member</Text>
						</div>
						<div className={styles.orgGroup}>
							<Title className={styles.orgGroupTitle} order={2}>{t('org.fiscal_council.title')}</Title>
							<Text>member</Text>
						</div>
						<div className={styles.orgGroup}>
							<Title className={styles.orgGroupTitle} order={2}>{t('org.consultive_council.title')}</Title>
							<Text>member</Text>
						</div>
					</div>

				</div>

			</Section>
		</div>
	);

	//
}
