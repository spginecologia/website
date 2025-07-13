/* * */

import { UserQuotaPaymentStatus } from '@/payload/collections/User/options';
import { IconAlertSquareFilled, IconArrowForwardUp, IconCheck, IconFlag3Filled, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	paymentLinkUrl?: null | string
	status: UserQuotaPaymentStatus
}

/* * */

export function QuotaPaymentStatus({ paymentLinkUrl, status }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.QuotaPaymentStatus');

	//
	// B. Render components

	switch (status) {
		case 'canceled':
			return (
				<div className={styles.container} data-status="canceled">
					<IconX size={16} />
					<p className={styles.label}>{t('canceled')}</p>
				</div>
			);
		case 'paid':
			return (
				<div className={styles.container} data-status="paid">
					<IconCheck size={16} />
					<p className={styles.label}>{t('paid')}</p>
				</div>
			);
		case 'refunded':
			return (
				<div className={styles.container} data-status="refunded">
					<IconArrowForwardUp size={16} />
					<p className={styles.label}>{t('refunded')}</p>
				</div>
			);
		case 'waiting':
			return (
				<a className={styles.container} data-status="waiting" href={paymentLinkUrl ?? '#'} target="_blank">
					<IconFlag3Filled size={16} />
					<p className={styles.label}>{t('waiting')}</p>
				</a>
			);
		default:
			return (
				<div className={styles.container} data-status="unknown">
					<IconAlertSquareFilled size={16} />
					<p className={styles.label}>{t('unknown')}</p>
				</div>
			);
	}

	//
}
