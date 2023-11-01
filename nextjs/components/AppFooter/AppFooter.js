/* * */

import styles from './AppFooter.module.css';
import AppFooterLogo from '@/components/AppFooterLogo/AppFooterLogo';
import AppFooterNewsletter from '@/components/AppFooterNewsletter/AppFooterNewsletter';
import AppFooterContacts from '@/components/AppFooterContacts/AppFooterContacts';
import AppFooterLegal from '@/components/AppFooterLegal/AppFooterLegal';

/* * */

export default function AppFooter() {
  return (
    <div className={styles.container}>
      <div className={styles.primaryWrapper}>
        <div className={styles.primary}>
          <AppFooterLogo />
          <AppFooterNewsletter />
          <AppFooterContacts />
        </div>
      </div>
      <div className={styles.secondaryWrapper}>
        <div className={styles.secondary}>
          <AppFooterLegal />
        </div>
      </div>
    </div>
  );
}
