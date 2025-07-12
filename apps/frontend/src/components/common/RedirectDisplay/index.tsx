/* * */

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	href?: null | string
	withDelay?: number
}

/* * */

export function RedirectDisplay({ href, withDelay = 0 }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.RedirectDisplay');

	//
	// B. Handle actions

	useEffect(() => {
		if (!href) return;
		setTimeout(() => {
			window.location.replace(href);
		}, withDelay);
	}, [href, withDelay]);

	//
	// C. Render components

	return <div className={styles.container}>{t('title')}</div>;

	//
}
