/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendAccountSubscriptionInfoStatus.module.css';
import { IconCheck, IconX, IconAlertTriangleFilled, IconInfoCircle } from '@tabler/icons-react';

/* * */

export default function FrontendAccountSubscriptionInfoStatus({ status }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendAccountSubscriptionInfoStatus');

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

    case 'past_due':
    case 'incomplete':
      return (
        <div className={`${styles.container} ${styles.expiringAutoRenew}`}>
          <IconAlertTriangleFilled size={18} />
          <p className={styles.label}>{t('past_due')}</p>
        </div>
      );

    case 'unpaid':
    case 'canceled':
    case 'incomplete_expired':
      return (
        <div className={`${styles.container} ${styles.expired}`}>
          <IconX size={18} />
          <p className={styles.label}>{t('canceled')}</p>
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
