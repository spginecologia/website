/* * */

import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

import { NoDataDisplay } from '../NoDataDisplay';

/* * */

interface Props {
	href?: null | string
	target?: '_blank' | '_self'
	withDelay?: number
}

/* * */

export function RedirectDisplay({ href, target = '_blank', withDelay = 0 }: Props) {
	//

	//
	// A. Setup variables

	const { t } = useTranslation('common.RedirectDisplay');

	const [manualButtonIsVisible, setManualButtonIsVisible] = useState(false);

	//
	// B. Handle actions

	const handleOpenLink = () => {
		if (href) window.open(href, target);
	};

	useEffect(() => {
		if (!href) return;
		const timeout = setTimeout(handleOpenLink, withDelay);
		return () => clearTimeout(timeout);
	}, [href, withDelay]);

	useEffect(() => {
		if (!href) return;
		const timeout = setTimeout(() => setManualButtonIsVisible(true), 5000);
		return () => clearTimeout(timeout);
	}, [href, withDelay]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			{manualButtonIsVisible ? <Button onClick={handleOpenLink}>{t('open')}</Button> : <NoDataDisplay text={t('title')} />}
		</div>
	);

	//
}
