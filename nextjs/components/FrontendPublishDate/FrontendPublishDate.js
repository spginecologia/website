'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendPublishDate.module.css';

/* * */

export default function FrontendPublishDate({ date = '18-10-2023' }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendPublishDate');

  //
  // B. Render components

  return <p className={styles.text}>{t('label', { date: date })}</p>;

  //
}
