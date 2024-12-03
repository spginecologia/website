/* * */

import { Image } from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	coverAspectRatio?: string
	coverSrc?: null | string
	href?: string
	publishDate?: Date | null
	subtitle?: null | string
	target?: '_blank' | '_self'
	title?: null | string
}

/* * */

export default function Card({ coverAspectRatio, coverSrc, href = '#', publishDate, subtitle, target = '_self', title }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.Card');

	//
	// B. Render components

	return (
		<Link className={styles.container} href={href} target={target}>
			{coverSrc && <Image className={styles.cover} src={coverSrc} style={{ aspectRatio: coverAspectRatio }} />}
			{title && <div className={styles.title}>{title}</div>}
			{subtitle && <div className={styles.subtitle}>{subtitle}</div>}
			{publishDate && <div className={styles.subtitle}>{t('publish_date', { value: publishDate })}</div>}
		</Link>
	);

	//
}
