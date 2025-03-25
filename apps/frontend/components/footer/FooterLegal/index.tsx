'use client';

/* * */

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function FooterLegal() {
	//

	//
	// A. Setup variables

	const t = useTranslations('footer.FooterLegal');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Link className={styles.credits} href="https://joao.earth" target="_blank">
					{t('credits')}
				</Link>
			</div>
			<div className={styles.center}>
				<p className={styles.copyright}>{t('copyright', { year: new Date().getFullYear() })}</p>
			</div>
			<div className={styles.right}>
				<Link className={styles.legalLink} href="/brand" target="_blank">
					{t('brand_assets')}
				</Link>
				<Link className={styles.legalLink} href="/privacy" target="_blank">
					{t('privacy')}
				</Link>
			</div>
		</div>
	);
}
