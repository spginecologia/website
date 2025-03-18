/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section } from '@/components/common/Section';
import { Button, Image, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

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
		<ContentWrapper>

			<Title order={1}>{t('title_1')}</Title>
			<div className={styles.grid1}>
				<div className={styles.cell}>
					<Image className={styles.headerLogo} src="/generic/spg/spg-logo-vertical.svg" />
				</div>
				<div className={styles.cellB}>
					<Title order={2}>{t('title_1')}</Title>
					<Text>{t('paragraph')}</Text>
					<Button w="100%">{t('button_1')}</Button>
					<Button w="100%">{t('button_2')}</Button>
				</div>
			</div>

			<Section withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
				<Title order={1}>{t('title_2')}</Title>
				<div className={styles.grid2}>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
				</div>

				<div className={styles.grid3}>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
				</div>

				<div className={styles.grid4}>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
				</div>
			</Section>

			<Section withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
				<Title order={1}>{t('title_3')}</Title>
				<div className={styles.grid5}>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
					<div className={styles.cellB}>
						<Image src="/generic/sociedade.png" />
					</div>
				</div>
			</Section>
		</ContentWrapper>
	);

	//
}
