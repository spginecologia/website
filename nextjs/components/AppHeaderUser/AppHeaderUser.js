'use client';

/* * */

import styles from './AppHeaderUser.module.css';
import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { IconUserCircle, IconWallet } from '@tabler/icons-react';
import Loader from '@/components/Loader/Loader';

/* * */

const PROFILE_PAGES = [
  { key: 'account', path: '/account', icon: <IconUserCircle size={24} /> },
  { key: 'payments', path: '/payments', icon: <IconWallet size={24} /> },
];

/* * */

export default function AppHeaderUser() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppHeaderUser');
  const { status: sessionStatus, data: sessionData } = useSession();

  //
  // B. Render components

  return (
    <div className={styles.container}>
      {sessionStatus === 'loading' && <Loader size={20} visible full />}
      {sessionStatus === 'authenticated' && (
        <>
          <Link href="/account" className={styles.target}>
            {sessionData?.user?.title && <span className={styles.userTitle}>{sessionData?.user?.title}</span>}
            {sessionData?.user?.name && <span className={styles.userTitle}>{sessionData?.user?.name.substring(0, 12)}</span>}
          </Link>
          <div className={styles.dropdown}>
            {PROFILE_PAGES.map((item) => (
              <Link key={item.key} href={item.path} className={styles.dropdownLink}>
                <span className={styles.dropdownLinkIcon}>{item.icon}</span>
                <span className={styles.dropdownLinkLabel}>{t(`${item.key}.label`)}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );

  //
}
