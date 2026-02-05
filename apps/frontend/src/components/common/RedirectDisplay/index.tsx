/* * */

import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

	const { t } = useTranslation();

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
			{manualButtonIsVisible ? <Button onClick={handleOpenLink}>{t('common.RedirectDisplay.open')}</Button> : <NoDataDisplay text={t('common.RedirectDisplay.title')} />}
		</div>
	);

	//
}
