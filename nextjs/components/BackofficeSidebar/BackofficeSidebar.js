'use client';

/* * */

import styles from './BackofficeSidebar.module.css';
import Link from 'next-intl/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Tooltip, ActionIcon } from '@mantine/core';
import { IconChartPie, IconNews, IconCalendarEvent, IconBrandYoutube } from '@tabler/icons-react';
import AuthGate from '@/components/AuthGate/AuthGate';
import { SpgLogoIcon } from '@/assets/spg';

/* * */

const SIDEBAR_LINKS = [
  { key: 'statistics', path: '/admin', icon: <IconChartPie />, auth_scope: 'statistics', auth_permission: 'view' },
  { key: 'news', path: '/admin/news', icon: <IconNews />, auth_scope: 'news', auth_permission: 'view' },
  { key: 'agenda', path: '/admin/agenda', icon: <IconCalendarEvent />, auth_scope: 'agenda', auth_permission: 'view' },
  { key: 'videos', path: '/admin/videos', icon: <IconBrandYoutube />, auth_scope: 'videos', auth_permission: 'view' },
];

/* * */

export default function BackofficeSidebar() {
  //

  //
  // A. Setup variables

  const params = useParams();
  const pathname = usePathname();
  const t = useTranslations('BackofficeSidebar');

  //
  // B. Transform data

  const isActivePage = (path) => {
    if (path === '' && pathname === '') {
      return false;
    } else if (path === '/admin' && pathname === `/${params.locale}/admin`) {
      return true;
    } else if (path !== '/admin' && pathname !== `/${params.locale}/admin`) {
      return pathname.includes(path);
    }
  };

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <SpgLogoIcon />
      </Link>
      <div className={styles.navWrapper}>
        {SIDEBAR_LINKS.map((item) => (
          <AuthGate key={item.key} scope={item.auth_scope} permission={item.auth_permission}>
            <Tooltip label={t(item.key)} position="right">
              <Link href={item.path}>
                <ActionIcon className={`${styles.navButton} ${isActivePage(item.path) && styles.selected}`} size="xl" color="gray">
                  {item.icon}
                </ActionIcon>
              </Link>
            </Tooltip>
          </AuthGate>
        ))}
      </div>
    </div>
  );

  //
}
