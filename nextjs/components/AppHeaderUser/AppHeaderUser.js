'use client';

/* * */

import styles from './AppHeaderUser.module.css';
import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { IconBrandYoutube, IconBuildingCottage } from '@tabler/icons-react';
import Loader from '@/components/Loader/Loader';

/* * */

const PROFILE_PAGES = [
  { key: 'home', path: '/home', icon: <IconBuildingCottage size={20} /> },
  { key: 'videos', path: '/videos', icon: <IconBrandYoutube size={22} /> },
];

/* * */

export default function AppHeaderUser() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppHeaderUser');
  const { status: sessionStatus, data: sessionData } = useSession();

  console.log(sessionStatus);

  //
  // A. Render components

  return (
    <div className={styles.container}>
      {sessionStatus === 'loading' && <Loader size={20} visible full />}
      {sessionStatus === 'authenticated' && (
        <Link href="/profile" className={styles.target}>
          {sessionData?.user?.title && <span className={styles.userTitle}>{sessionData?.user?.title}</span>}
          {sessionData?.user?.name && <span className={styles.userTitle}>{sessionData?.user?.name.substring(0, 10)}</span>}
        </Link>
      )}
    </div>
  );

  //
}
