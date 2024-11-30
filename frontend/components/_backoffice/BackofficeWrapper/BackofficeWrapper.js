/* * */

import styles from './BackofficeWrapper.module.css';
import BackofficeSidebar from '@/components/BackofficeSidebar/BackofficeSidebar';

/* * */

export default function BackofficeWrapper({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebarWrapper}>
        <BackofficeSidebar />
      </div>
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
}
