'use client';

/* * */

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/translations/navigation';
import styles from './AppAuthentication.module.css';
import Section from '@/components/FrontendSection/FrontendSection';
import Loader from '@/components/Loader/Loader';
import Panel from '@/components/Panel/Panel';

/* * */

export default function AppAuthentication({ children }) {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  //
  // B. Handle actions

  useEffect(() => {
    const checkAuthStatusInterval = setInterval(() => {
      if (status === 'authenticated') {
        const callbackUrl = searchParams.get('callbackUrl');
        if (callbackUrl) router.push(callbackUrl);
        else router.push('/');
      }
    }, 500);
    return () => clearInterval(checkAuthStatusInterval);
  }, [router, status, searchParams]);

  //
  // C. Render components

  return (
    <div className={styles.container}>
      {(status === 'loading' || status === 'authenticated') && <Loader visible fixed />}
      <Section first>
        <div className={styles.grid}>
          <Panel>{children}</Panel>
          <div className={styles.advert}></div>
        </div>
      </Section>
    </div>
  );

  //
}
