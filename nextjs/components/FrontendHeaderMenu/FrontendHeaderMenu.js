'use client';

/* * */

import { Link } from '@/translations/navigation';
import styles from './FrontendHeaderMenu.module.css';
import { useTranslations } from 'next-intl';
import { IconSearch } from '@tabler/icons-react';

/* * */

const MENU_PAGES = [
  { key: 'society', path: '/society' },
  { key: 'sections', path: '/sections' },
  { key: 'workgroups', path: '/workgroups' },
  { key: 'news', path: '/news' },
  { key: 'agenda', path: '/agenda' },
  { key: 'award', path: '/award' },
];

/* * */

export default function FrontendHeaderMenu() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendHeaderMenu');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      {MENU_PAGES.map((item) => (
        <Link key={item.key} href={item.path} className={styles.link}>
          {t(`${item.key}.label`)}
        </Link>
      ))}
      <Link href={'/academia/topics'} className={styles.search}>
        <IconSearch size={18} />
      </Link>
    </div>
  );
}
