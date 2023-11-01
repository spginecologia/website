/* * */

import Link from 'next-intl/link';
import styles from './AppHeaderMenu.module.css';
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

export default function AppHeaderMenu() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppHeaderMenu');

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
