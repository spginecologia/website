/* * */

import { UserQuotaPaymentStatus } from '@/services/payload/collections/User/options';
import { IconAlertSquareFilled, IconArrowForwardUp, IconCheck, IconFlag3Filled, IconGift, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

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

	const { t } = useTranslation();

	//
	// B. Render components

	switch (status) {
		case 'canceled':
			return (
				<div className={styles.container} data-status="canceled">
					<IconX size={16} />
					<p className={styles.label}>{t('account.QuotaPaymentStatus.canceled')}</p>
				</div>
			);
		case 'free':
			return (
				<div className={styles.container} data-status="free">
					<IconGift size={16} />
					<p className={styles.label}>{t('account.QuotaPaymentStatus.free')}</p>
				</div>
			);
		case 'paid':
			return (
				<div className={styles.container} data-status="paid">
					<IconCheck size={16} />
					<p className={styles.label}>{t('account.QuotaPaymentStatus.paid')}</p>
				</div>
			);
		case 'refunded':
			return (
				<div className={styles.container} data-status="refunded">
					<IconArrowForwardUp size={16} />
					<p className={styles.label}>{t('account.QuotaPaymentStatus.refunded')}</p>
				</div>
			);
		case 'waiting':
			return (
				<a className={styles.container} data-status="waiting" href={paymentLinkUrl ?? '#'} target="_blank">
					<IconFlag3Filled size={16} />
					<p className={styles.label}>{t('account.QuotaPaymentStatus.waiting')}</p>
				</a>
			);
		default:
			return (
				<div className={styles.container} data-status="unknown">
					<IconAlertSquareFilled size={16} />
					<p className={styles.label}>{t('account.QuotaPaymentStatus.unknown')}</p>
				</div>
			);
	}

	//
}
