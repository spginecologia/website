/* * */

import { IconRepeat, IconRepeatOff } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function AccountSubscriptionInfoRenew({ canceledAt, currentPeriodEnd, status }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountSubscriptionInfoRenew');

	//
	// B. Transform data

	const currentPeriodEndFormatted = new Date(currentPeriodEnd * 1000).toLocaleDateString('pt-PT');
	const canceledAtFormatted = new Date(canceledAt * 1000).toLocaleDateString('pt-PT');

	//
	// C. Render components

	switch (status) {
		case 'active':
			return (
				<div className={styles.container}>
					<IconRepeat size={18} />
					<p className={styles.label}>{t('active', { renew_date: currentPeriodEndFormatted })}</p>
				</div>
			);

		case 'canceled':
		case 'incomplete_expired':
		case 'unpaid':
			return (
				<div className={styles.container}>
					<IconRepeatOff size={18} />
					<p className={styles.label}>{t('canceled', { canceled_date: canceledAtFormatted })}</p>
				</div>
			);
		case 'incomplete':
		case 'past_due':
			return (
				<div className={styles.container}>
					<IconRepeat size={18} />
					<p className={styles.label}>{t('past_due', { renew_date: currentPeriodEndFormatted })}</p>
				</div>
			);

		default:
			return <></>;
	}

	//
}
