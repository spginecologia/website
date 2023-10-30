'use client';

/* * */

import styles from './AppHeaderAcademia.module.css';
import { SpgAcademia } from '@/assets/spg';
import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';
import { IconBooks, IconBrandYoutube, IconBuildingCottage, IconBulb, IconFileCheck, IconListSearch, IconSchool, IconVideoPlus } from '@tabler/icons-react';

/* * */

const ACADEMIA_PAGES = [
  { key: 'home', path: '/home', icon: <IconBuildingCottage size={20} /> },
  { key: 'videos', path: '/videos', icon: <IconBrandYoutube size={22} /> },
  { key: 'videos_new', path: '/videos/new', icon: <IconVideoPlus size={24} /> },
  { key: 'consensos', path: '/consensos', icon: <IconFileCheck size={24} /> },
  { key: 'publicacoes', path: '/publicacoes', icon: <IconBooks size={24} /> },
  { key: 'courses', path: '/courses', icon: <IconSchool size={24} /> },
  { key: 'bolsa', path: '/bolsa', icon: <IconBulb size={24} /> },
  { key: 'pesquisa', path: '/pesquisa', icon: <IconListSearch size={24} /> },
];

/* * */

export default function AppHeaderAcademia() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppHeaderAcademia');

  //
  // A. Render components

  return (
    <div className={styles.container}>
      <Link href="/academia" className={styles.target}>
        <SpgAcademia />
      </Link>

      <div className={styles.dropdown}>
        {ACADEMIA_PAGES.map((item) => (
          <Link key={item.key} href={item.path} className={styles.dropdownLink}>
            <span className={styles.dropdownLinkIcon}>{item.icon}</span>
            <span className={styles.dropdownLinkLabel}>{t(`${item.key}.label`)}</span>
          </Link>
        ))}
      </div>
    </div>
  );

  //
}
