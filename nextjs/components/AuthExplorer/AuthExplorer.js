'use client';

/* * */

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-intl/client';
import styles from './AuthExplorer.module.css';
import Section from '@/components/Section/Section';
import Loader from '@/components/Loader/Loader';
import Panel from '@/components/Panel/Panel';

/* * */

export default function AuthExplorer({ children }) {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  //
  // B. Handle actions

  useEffect(() => {
    if (status === 'authenticated') {
      const callbackUrl = searchParams.get('callbackUrl');
      if (callbackUrl) router.push(callbackUrl);
      else router.push('/');
    }
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
