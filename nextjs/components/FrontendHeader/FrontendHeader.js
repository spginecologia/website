/* * */

import styles from './FrontendHeader.module.css';
import FrontendHeaderMenu from '@/components/FrontendHeaderMenu/FrontendHeaderMenu';
import FrontendHeaderLogo from '@/components/FrontendHeaderLogo/FrontendHeaderLogo';
import FrontendHeaderBreadcrumbs from '@/components/FrontendHeaderBreadcrumbs/FrontendHeaderBreadcrumbs';
import FrontendHeaderAcademia from '@/components/FrontendHeaderAcademia/FrontendHeaderAcademia';
import FrontendHeaderUser from '@/components/FrontendHeaderUser/FrontendHeaderUser';

/* * */

export default function FrontendHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.primaryWrapper}>
        <div className={styles.primary}>
          <FrontendHeaderLogo />
          <FrontendHeaderMenu />
          <div className={styles.buttons}>
            <FrontendHeaderAcademia />
            <FrontendHeaderUser />
          </div>
        </div>
      </div>
      <div className={styles.secondaryWrapper}>
        <div className={styles.secondary}>
          <FrontendHeaderBreadcrumbs />
        </div>
      </div>
    </div>
  );
}
