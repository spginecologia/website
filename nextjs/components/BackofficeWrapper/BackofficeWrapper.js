/* * */

import styles from './BackofficeWrapper.module.css';
import BackofficeSidebar from '@/components/BackofficeSidebar/BackofficeSidebar';

/* * */

export default function BackofficeWrapper({ children }) {
  return (
    <div className={styles.container}>
      <BackofficeSidebar />
      <div className={styles.innerWrapper}>{children}</div>
    </div>
  );
}
