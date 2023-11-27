'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendAccountPayments.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import Panel from '@/components/Panel/Panel';
import FrontendAccountPaymentsCheckout from '@/components/FrontendAccountPaymentsCheckout/FrontendAccountPaymentsCheckout';

/* * */

export default function FrontendAccountPayments() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendAccountPayments');

  //
  // C. Render components

  return (
    <Panel>
      <div className={styles.container}>
        <Title level="h2" text={t('title')} />
        <Text text={t('subtitle')} />
        <FrontendAccountPaymentsCheckout />
      </div>
    </Panel>
  );
}
