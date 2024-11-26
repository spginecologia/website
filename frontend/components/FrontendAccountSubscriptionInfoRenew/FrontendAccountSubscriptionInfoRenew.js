/* * */

import { useTranslations } from 'next-intl';
import { IconRepeat, IconRepeatOff } from '@tabler/icons-react';
import styles from './FrontendAccountSubscriptionInfoRenew.module.css';

/* * */

export default function FrontendAccountSubscriptionInfoRenew({ status, currentPeriodEnd, canceledAt }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendAccountSubscriptionInfoRenew');

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

    case 'past_due':
    case 'incomplete':
      return (
        <div className={styles.container}>
          <IconRepeat size={18} />
          <p className={styles.label}>{t('past_due', { renew_date: currentPeriodEndFormatted })}</p>
        </div>
      );

    case 'unpaid':
    case 'canceled':
    case 'incomplete_expired':
      return (
        <div className={styles.container}>
          <IconRepeatOff size={18} />
          <p className={styles.label}>{t('canceled', { canceled_date: canceledAtFormatted })}</p>
        </div>
      );

    default:
      return <></>;
  }

  //
}
