'use client';

/* * */

import { useEffect, useState } from 'react';
import styles from './FrontendSubscriptionRenew.module.css';
import Panel from '@/components/Panel/Panel';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import FrontendSubscriptionRenewSuccess from '@/components/FrontendSubscriptionRenewSuccess/FrontendSubscriptionRenewSuccess';
import FrontendSubscriptionRenewError from '@/components/FrontendSubscriptionRenewError/FrontendSubscriptionRenewError';
import FrontendSubscriptionRenewLoading from '@/components/FrontendSubscriptionRenewLoading/FrontendSubscriptionRenewLoading';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

/* * */

export default function FrontendSubscriptionRenew() {
  //

  //
  // A. Setup variables

  const [status, setStatus] = useState('loading');
  const [sessionId, setSessionId] = useState('');

  //
  // B. Fetch data

  const { data: subscriptionStatusData, isLoading: subscriptionStatusLoading } = useSWR('/api/users/subscription/check');

  //
  // B. Transform data

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const urlSearchQuery = new URLSearchParams(window.location.search);
    // If it is a success
    if (urlSearchQuery.get('success') && urlSearchQuery.get('session_id')) {
      setStatus('success');
      setSessionId(urlSearchQuery.get('session_id'));
    }
    // If it was canceled
    if (urlSearchQuery.get('canceled')) {
      setStatus('canceled');
    }
    // If it was error
    if (urlSearchQuery.get('error')) {
      setStatus('error');
    }
  }, [sessionId]);

  //
  // C. Handle actions

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <FrontendWrapperInner>
        <FrontendSection first>
          <Panel>
            {status === 'loading' && <FrontendSubscriptionRenewLoading />}
            {status === 'success' && <FrontendSubscriptionRenewSuccess />}
            {status === 'canceled' && <FrontendSubscriptionRenewError />}
          </Panel>
        </FrontendSection>
      </FrontendWrapperInner>
    </div>
  );

  //
}
