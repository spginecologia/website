'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendSubscriptionRenewSuccess.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import { IconCircleCheckFilled } from '@tabler/icons-react';

/* * */

export default function FrontendSubscriptionRenewSuccess() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendSubscriptionRenewSuccess');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <IconCircleCheckFilled size={50} />
      </div>
      <Title level="h2" text={t('title')} />
      <Text text={t('subtitle', { renew_date: '2022-01-01' })} />
    </div>
  );

  //
}
