/* * */

import styles from './FrontendFooter.module.css';
import FrontendFooterLogo from '@/components/FrontendFooterLogo/FrontendFooterLogo';
import FrontendFooterNewsletter from '@/components/FrontendFooterNewsletter/FrontendFooterNewsletter';
import FrontendFooterContacts from '@/components/FrontendFooterContacts/FrontendFooterContacts';
import FrontendFooterLegal from '@/components/FrontendFooterLegal/FrontendFooterLegal';

/* * */

export default function FrontendFooter() {
  return (
    <div className={styles.container}>
      <div className={styles.primaryWrapper}>
        <div className={styles.primary}>
          <FrontendFooterLogo />
          <FrontendFooterNewsletter />
          <FrontendFooterContacts />
        </div>
      </div>
      <div className={styles.secondaryWrapper}>
        <div className={styles.secondary}>
          <FrontendFooterLegal />
        </div>
      </div>
    </div>
  );
}
