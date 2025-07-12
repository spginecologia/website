/* * */

import { Purchase } from '@/types/payments';
import { IconArrowForwardUp, IconCheck, IconFlag3Filled, IconInfoCircle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	status: Purchase['status']
}

/* * */

export function PaymentStatus({ status }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.PaymentStatus');

	//
	// B. Render components

	switch (status) {
		case 'paid':
			return (
				<div className={`${styles.container} ${styles.paid}`}>
					<IconCheck size={16} />
					<p className={styles.label}>{t('paid')}</p>
				</div>
			);
		case 'refunded':
			return (
				<div className={`${styles.container} ${styles.refunded}`}>
					<IconArrowForwardUp size={16} />
					<p className={styles.label}>{t('refunded')}</p>
				</div>
			);
		case 'unpaid':
			return (
				<div className={`${styles.container} ${styles.unpaid}`}>
					<IconFlag3Filled size={16} />
					<p className={styles.label}>{t('unpaid')}</p>
				</div>
			);
		default:
			return (
				<div className={`${styles.container} ${styles.unknown}`}>
					<IconInfoCircle size={16} />
					<p className={styles.label}>{t('unknown')}</p>
				</div>
			);
	}

	//
}
