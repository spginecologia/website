'use client';

/* * */

import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import styles from './FrontendAccountSubscription.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import Panel from '@/components/Panel/Panel';
import Loader from '@/components/Loader/Loader';
import FrontendAccountSubscriptionInfoStatus from '@/components/FrontendAccountSubscriptionInfoStatus/FrontendAccountSubscriptionInfoStatus';
import FrontendAccountSubscriptionInfoRenew from '@/components/FrontendAccountSubscriptionInfoRenew/FrontendAccountSubscriptionInfoRenew';
import FrontendAccountSubscriptionManage from '@/components/FrontendAccountSubscriptionManage/FrontendAccountSubscriptionManage';

/* * */

export default function FrontendAccountSubscription() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendAccountSubscription');

  //
  // B. Fetch data

  const { data: subscriptionData, isLoading: subscriptionLoading } = useSWR('/api/subscription');

  //
  // C. Render components

  return (
    <Panel>
      <div className={styles.container}>
        <Title level="h2" text={t('title')} />
        <Text text={t('subtitle')} />
        <div className={styles.actions}>
          {subscriptionLoading && !subscriptionData && <Loader size={20} visible />}
          {!subscriptionLoading && subscriptionData && (
            <>
              <FrontendAccountSubscriptionInfoStatus status={subscriptionData.status} />
              <FrontendAccountSubscriptionInfoRenew status={subscriptionData.status} currentPeriodEnd={subscriptionData.current_period_end} canceledAt={subscriptionData.canceled_at} />
              <FrontendAccountSubscriptionManage status={subscriptionData.status} />
            </>
          )}
        </div>
      </div>
    </Panel>
  );

  //
}
