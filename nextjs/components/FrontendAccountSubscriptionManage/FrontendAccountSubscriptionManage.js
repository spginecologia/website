/* * */

import { useTranslations } from 'next-intl';
import { IconCreditCardPay } from '@tabler/icons-react';
import styles from './FrontendAccountSubscriptionManage.module.css';

/* * */

export default function FrontendAccountSubscriptionManage({ status }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendAccountSubscriptionManage');

  //
  // B. Render components

  switch (status) {
    case 'active':
      return (
        <a className={`${styles.container} ${styles.active}`} href="/api/subscription/manage">
          <IconCreditCardPay size={18} />
          <p className={styles.label}>{t('active')}</p>
        </a>
      );

    case 'past_due':
    case 'incomplete':
      return (
        <a className={`${styles.container} ${styles.pastDue}`} href="/api/subscription/manage">
          <IconCreditCardPay size={18} />
          <p className={styles.label}>{t('past_due')}</p>
        </a>
      );

    case 'unpaid':
    case 'canceled':
    case 'incomplete_expired':
      return (
        <a className={`${styles.container} ${styles.canceled}`} href="/api/subscription/renew">
          <IconCreditCardPay size={18} />
          <p className={styles.label}>{t('canceled')}</p>
        </a>
      );

    default:
      return (
        <a className={`${styles.container} ${styles.notFound}`} href="/api/subscription/renew">
          <IconCreditCardPay size={18} />
          <p className={styles.label}>{t('not_found')}</p>
        </a>
      );
  }

  //
}
