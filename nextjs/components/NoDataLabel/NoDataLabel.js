'use client';

import styles from './NoDataLabel.module.css';
import { useTranslations } from 'next-intl';

export default function NoDataLabel({ fill = false, text }) {
  //

  const t = useTranslations('NoDataLabel');

  return <div className={`${styles.container} ${fill && styles.fill}`}>{text || t('title')}</div>;
}
