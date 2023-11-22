/* * */

import styles from './FrontendWrapperInner.module.css';

/* * */

export default function FrontendWrapperInner({ children }) {
  return <div className={styles.container}>{children}</div>;
}
