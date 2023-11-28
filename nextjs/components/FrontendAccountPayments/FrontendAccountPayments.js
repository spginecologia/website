'use client';

/* * */

import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import styles from './FrontendAccountPayments.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import Panel from '@/components/Panel/Panel';
import { useSession } from 'next-auth/react';
import FrontendAccountPaymentsCheckout from '@/components/FrontendAccountPaymentsCheckout/FrontendAccountPaymentsCheckout';

/* * */

export default function FrontendAccountPayments() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendAccountPayments');
  const { data: sessionData } = useSession();

  //
  // B. Fetch data

  const { data: subscriptionData } = useSWR(sessionData?.user?._id && `/api/users/${sessionData.user._id}/subscription/status`);

  //
  // C. Render components

  return (
    <Panel>
      <div className={styles.container}>
        <Title level="h2" text={t('title')} />
        <Text text={t('subtitle')} />
        {subscriptionData?.status ? 'You are subscribed' : <FrontendAccountPaymentsCheckout />}
      </div>
    </Panel>
  );

  //
}