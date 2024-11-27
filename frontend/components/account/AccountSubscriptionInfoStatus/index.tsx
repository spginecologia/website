/* * */

import { IconAlertTriangleFilled, IconCheck, IconInfoCircle, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function AccountSubscriptionInfoStatus({ status }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountSubscriptionInfoStatus');

	//
	// B. Render components

	switch (status) {
		case 'active':
			return (
				<div className={`${styles.container} ${styles.active}`}>
					<IconCheck size={18} />
					<p className={styles.label}>{t('active')}</p>
				</div>
			);

		case 'canceled':
		case 'incomplete_expired':
		case 'unpaid':
			return (
				<div className={`${styles.container} ${styles.expired}`}>
					<IconX size={18} />
					<p className={styles.label}>{t('canceled')}</p>
				</div>
			);

		case 'incomplete':
		case 'past_due':
			return (
				<div className={`${styles.container} ${styles.expiringAutoRenew}`}>
					<IconAlertTriangleFilled size={18} />
					<p className={styles.label}>{t('past_due')}</p>
				</div>
			);

		default:
			return (
				<div className={`${styles.container} ${styles.error}`}>
					<IconInfoCircle size={18} />
					<p className={styles.label}>{t('not_found')}</p>
				</div>
			);
	}

	//
}
