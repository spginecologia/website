'use client';

/* * */

import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function LinkItem({ linkData }) {
	return (
		<Link className={`${styles.container} ${linkData.is_featured && styles.isFeatured}`} href={linkData.href} target="_blank">
			<p className={styles.title}>{linkData.title}</p>
			{linkData.subtitle && <p className={styles.subtitle}>{linkData.subtitle}</p>}
		</Link>
	);
}
