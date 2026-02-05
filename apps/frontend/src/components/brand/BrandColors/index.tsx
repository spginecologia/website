'use client';

/* * */

import { Section } from '@/components/common/Section';
import { Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function BrandColors({ withTopSpacer = true }) {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Section withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
				<Title order={1}>{t('brand.BrandColors.title')}</Title>
				<div className={styles.topGrid}>
					<div className={styles.card} style={{ backgroundColor: '#a0285a', color: '#ffffff' }}>
						<div>#a0285a</div>
						<div>RGB: 160, 40, 90</div>
						<div>CMYK: 31, 93, 47, 14</div>
					</div>
					<div className={styles.card} style={{ backgroundColor: '#b46996', color: '#ffffff' }}>
						<div className={styles.first_block_text}>#b46996</div>
						<div className={styles.first_block_text}>RGB: 180, 105, 150</div>
						<div className={styles.first_block_text}>CMYK: 31, 69, 18, 0</div>
					</div>
					<div className={styles.card} style={{ backgroundColor: '#f5cdcd', color: '#a0285a' }}>
						<div className={styles.first_block_text}>#f5cdcd</div>
						<div className={styles.first_block_text}>RGB: 245, 205, 205</div>
						<div className={styles.first_block_text}>CMYK: 2, 20, 8, 0</div>
					</div>
				</div>
				<div className={styles.bottomGrid}>
					<div className={styles.card} style={{ backgroundColor: '#870f50', color: '#ffffff' }}>
						<div className={styles.first_block_text}>#870f50</div>
						<div className={styles.first_block_text}>RGB: 135, 15, 80</div>
					</div>
					<div className={styles.card} style={{ backgroundColor: '#64003c', color: '#ffffff' }}>
						<div className={styles.first_block_text}>#64003c</div>
						<div className={styles.first_block_text}>RGB: 100, 0, 60</div>
					</div>
					<div className={styles.card} style={{ backgroundColor: '#ebe9e6', color: '#645a69' }}>
						<div className={styles.first_block_text}>#ebe9e6</div>
						<div className={styles.first_block_text}>RGB: 235, 233, 230</div>
					</div>
					<div className={styles.card} style={{ backgroundColor: '#a09696', color: '#ffffff' }}>
						<div className={styles.first_block_text}>#a09696</div>
						<div className={styles.first_block_text}>RGB: 160, 150, 150</div>
					</div>
					<div className={styles.card} style={{ backgroundColor: '#645a69', color: '#ffffff' }}>
						<div className={styles.first_block_text}>#645a69</div>
						<div className={styles.first_block_text}>RGB: 100, 90, 105</div>
					</div>
				</div>
			</Section>
		</div>
	);

	//
}
