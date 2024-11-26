/* * */

import styles from './FrontendNewsGridWrapper.module.css';

/* * */

export default function FrontendNewsGridWrapper({ children }) {
  return <div className={styles.container}>{children}</div>;
}
