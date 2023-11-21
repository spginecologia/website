'use client';

/* * */

import { Link } from '@/translations/navigation';
import styles from './BackofficeSidebar.module.css';
import AuthGate from '@/components/AuthGate/AuthGate';
import { SpgLogoIcon } from '@/assets/spg';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Tooltip, ActionIcon } from '@mantine/core';
import { IconChartPie, IconNews, IconCalendarEvent, IconBrandYoutube, IconUsers, IconFileCheck, IconBooks, IconSchool, IconBulb, IconAward, IconMessageHeart, IconListSearch, IconFlower, IconCash, IconLogout2 } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';

/* * */

const SIDEBAR_LINKS = [
  { key: 'statistics', path: '/admin', icon: <IconChartPie />, auth_scope: 'statistics', auth_permission: 'view' },
  { key: 'news', path: '/admin/news', icon: <IconNews />, auth_scope: 'news', auth_permission: 'view' },
  { key: 'agenda', path: '/admin/agenda', icon: <IconCalendarEvent />, auth_scope: 'agenda', auth_permission: 'view' },
  { key: 'videos', path: '/admin/videos', icon: <IconBrandYoutube />, auth_scope: 'videos', auth_permission: 'view' },
  { key: 'guidelines', path: '/admin/guidelines', icon: <IconFileCheck />, auth_scope: 'guidelines', auth_permission: 'view' },
  { key: 'publications', path: '/admin/publications', icon: <IconBooks />, auth_scope: 'publications', auth_permission: 'view' },
  { key: 'courses', path: '/admin/courses', icon: <IconSchool />, auth_scope: 'courses', auth_permission: 'view' },
  { key: 'awards', path: '/admin/awards', icon: <IconAward />, auth_scope: 'awards', auth_permission: 'view' },
  { key: 'grants', path: '/admin/grants', icon: <IconBulb />, auth_scope: 'grants', auth_permission: 'view' },
  { key: 'topics', path: '/admin/topics', icon: <IconListSearch />, auth_scope: 'topics', auth_permission: 'view' },
  { key: 'testimonials', path: '/admin/testimonials', icon: <IconMessageHeart />, auth_scope: 'testimonials', auth_permission: 'view' },
  { key: 'tributes', path: '/admin/tributes', icon: <IconFlower />, auth_scope: 'tributes', auth_permission: 'view' },
  { key: 'users', path: '/admin/users', icon: <IconUsers />, auth_scope: 'users', auth_permission: 'view' },
  { key: 'payments', path: '/admin/payments', icon: <IconCash />, auth_scope: 'payments', auth_permission: 'view' },
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
  // C. Handle actions

  const handleLogout = () => {
    signOut();
  };

  //
  // D. Render components

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
        <Tooltip label={'Logout'} position="right">
          <ActionIcon className={styles.navButton} size="xl" color="red" onClick={handleLogout}>
            <IconLogout2 />
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  );

  //
}
