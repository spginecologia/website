'use client';

/* * */

import styles from './FrontendHeaderAcademia.module.css';
import { SpgAcademia } from '@/assets/spg';
import { Link } from '@/translations/navigation';
import { useTranslations } from 'next-intl';
import { IconBooks, IconBrandYoutube, IconBuildingCottage, IconBulb, IconFileCheck, IconListSearch, IconSchool, IconVideoPlus } from '@tabler/icons-react';

/* * */

const ACADEMIA_PAGES = [
  { key: 'home', path: '/academia', icon: <IconBuildingCottage size={20} /> },
  { key: 'videos', path: '/academia/videos', icon: <IconBrandYoutube size={22} /> },
  { key: 'videos_new', path: '/academia/videos/new', icon: <IconVideoPlus size={24} /> },
  { key: 'guidelines', path: '/academia/guidelines', icon: <IconFileCheck size={24} /> },
  { key: 'publications', path: '/academia/publications', icon: <IconBooks size={24} /> },
  { key: 'courses', path: '/academia/courses', icon: <IconSchool size={24} /> },
  { key: 'grant', path: '/academia/grant', icon: <IconBulb size={24} /> },
  { key: 'topics', path: '/academia/topics', icon: <IconListSearch size={24} /> },
];

/* * */

export default function FrontendHeaderAcademia() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendHeaderAcademia');

  //
  // B. Render components

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
