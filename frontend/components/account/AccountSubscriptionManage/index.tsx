/* * */

import { IconCreditCardPay } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function AccountSubscriptionManage({ status }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountSubscriptionManage');

	//
	// B. Render components

	switch (status) {
		case 'active':
			return (
				<a className={`${styles.container} ${styles.active}`} href="/api/account/subscription/manage">
					<IconCreditCardPay size={18} />
					<p className={styles.label}>{t('active')}</p>
				</a>
			);

		case 'canceled':
		case 'incomplete_expired':
		case 'unpaid':
			return (
				<a className={`${styles.container} ${styles.canceled}`} href="/api/account/subscription/renew">
					<IconCreditCardPay size={18} />
					<p className={styles.label}>{t('canceled')}</p>
				</a>
			);
		case 'incomplete':
		case 'past_due':
			return (
				<a className={`${styles.container} ${styles.pastDue}`} href="/api/account/subscription/manage">
					<IconCreditCardPay size={18} />
					<p className={styles.label}>{t('past_due')}</p>
				</a>
			);

		default:
			return (
				<a className={`${styles.container} ${styles.notFound}`} href="/api/account/subscription/renew">
					<IconCreditCardPay size={18} />
					<p className={styles.label}>{t('not_found')}</p>
				</a>
			);
	}

	//
}
