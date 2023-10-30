'use client';

/* * */

import Link from 'next-intl/link';
import styles from './AppHeaderMenu.module.css';
import { useTranslations } from 'next-intl';
import { IconSearch } from '@tabler/icons-react';

/* * */

const MENU_PAGES = [
  { key: 'sociedade', path: '/sociedade' },
  { key: 'seccoes', path: '/seccoes' },
  { key: 'nucleos', path: '/nucleos' },
  { key: 'noticias', path: '/noticias' },
  { key: 'agenda', path: '/agenda' },
  { key: 'premio', path: '/premio' },
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
      <Link href={'/pesquisa'} className={styles.link}>
        <IconSearch size={18} />
      </Link>
    </div>
  );
}
