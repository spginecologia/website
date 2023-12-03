'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendSubscriptionRenewError.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import { IconCircleXFilled } from '@tabler/icons-react';

/* * */

export default function FrontendSubscriptionRenewError() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendSubscriptionRenewError');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <IconCircleXFilled size={50} />
      </div>
      <Title level="h2" text={t('title')} />
      <Text text={t('subtitle')} />
    </div>
  );

  //
}
