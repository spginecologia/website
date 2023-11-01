/* * */

import styles from './AppHeader.module.css';
import AppHeaderMenu from '@/components/AppHeaderMenu/AppHeaderMenu';
import AppHeaderLogo from '@/components/AppHeaderLogo/AppHeaderLogo';
import AppHeaderBreadcrumbs from '@/components/AppHeaderBreadcrumbs/AppHeaderBreadcrumbs';
import AppHeaderAcademia from '@/components/AppHeaderAcademia/AppHeaderAcademia';
import AppHeaderUser from '@/components/AppHeaderUser/AppHeaderUser';

/* * */

export default function AppHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.primaryWrapper}>
        <div className={styles.primary}>
          <AppHeaderLogo />
          <AppHeaderMenu />
          <div className={styles.buttons}>
            <AppHeaderAcademia />
            <AppHeaderUser />
          </div>
        </div>
      </div>
      <div className={styles.secondaryWrapper}>
        <div className={styles.secondary}>
          <AppHeaderBreadcrumbs />
        </div>
      </div>
    </div>
  );
}
