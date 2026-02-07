'use client';

/* * */

import pjson from '@pjson';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function FooterLegal() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Link className={styles.credits} href="https://joao.earth" target="_blank">
					{t('footer.FooterLegal.credits')}
				</Link>
			</div>
			<div className={styles.center}>
				<p className={styles.copyright}>{t('footer.FooterLegal.copyright', { year: new Date().getFullYear() })}</p>
			</div>
			<div className={styles.right}>
				<Link className={styles.legalLink} href="http://github.com/spginecologia/website" target="_blank">
					{pjson.version}
				</Link>
				<Link className={styles.legalLink} href="/brand" target="_blank">
					{t('footer.FooterLegal.brand_assets')}
				</Link>
				<Link className={styles.legalLink} href="/privacy" target="_blank">
					{t('footer.FooterLegal.privacy')}
				</Link>
			</div>
		</div>
	);
}
