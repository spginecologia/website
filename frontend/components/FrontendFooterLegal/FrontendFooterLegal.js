'use client';

/* * */

import { Link } from '@/translations/navigation';
import styles from './FrontendFooterLegal.module.css';
import { useTranslations } from 'next-intl';

/* * */

export default function FrontendFooterLegal() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendFooterLegal');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link href="https://joao.earth" target="_blank" className={styles.credits}>
          {t('credits')}
        </Link>
      </div>
      <div className={styles.center}>
        <p className={styles.copyright}>{t('copyright', { year: new Date().getFullYear() })}</p>
      </div>
      <div className={styles.right}>
        <Link href="/brand" target="_blank" className={styles.legalLink}>
          {t('brand_assets')}
        </Link>
        <Link href="/privacy" target="_blank" className={styles.legalLink}>
          {t('privacy')}
        </Link>
      </div>
    </div>
  );
}
