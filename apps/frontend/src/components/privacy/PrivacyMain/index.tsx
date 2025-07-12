/* * */

import { ContentWrapper } from '@/src/components/common/ContentWrapper';
import { Section } from '@/src/components/common/Section';
import { Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function PrivacyMain({ withTopSpacer = true }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('privacy.PrivacyMain');

	//
	// B. Render components

	return (
		<ContentWrapper>
			<Section withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					<div className={styles.cell}>
						<Text fw="bold">{t('subtitle_1')}</Text>
						<Text>{t('paragraph_1')}</Text>
					</div>
					<div />
					<div className={styles.cell}>
						<Title order={2}>{t('subtitle_2')}</Title>
						<Text>{t('paragraph_2')}</Text>
					</div>
					<div className={styles.cell}>
						<Title order={2}>{t('subtitle_3')}</Title>
						<Text>{t('paragraph_3')}</Text>
					</div>
				</div>
			</Section>
		</ContentWrapper>
	);

	//
}
