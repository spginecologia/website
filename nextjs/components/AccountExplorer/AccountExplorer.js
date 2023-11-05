'use client';

/* * */

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next-intl/client';
import styles from './AccountExplorer.module.css';
import Section from '@/components/FrontendSection/FrontendSection';
import Loader from '@/components/Loader/Loader';

/* * */

export default function AccountExplorer({ children }) {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const { status } = useSession();

  //
  // B. Handle actions

  useEffect(() => {
    if (status !== 'loading' && status !== 'authenticated') {
      router.push('/login');
    }
  }, [status, router]);

  //
  // C. Render components

  return (
    <div className={styles.container}>
      {(status === 'loading' || status !== 'authenticated') && <Loader visible fixed />}
      <Section first>
        <div className={styles.grid}>{children}</div>
      </Section>
    </div>
  );

  //
}
