/* * */

import styles from './OtherWrapper.module.css';

/* * */

export default function OtherWrapper({ children }) {
  return <div className={styles.container}>{children}</div>;
}
