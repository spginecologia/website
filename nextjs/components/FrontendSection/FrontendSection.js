/* * */

import styles from './FrontendSection.module.css';

/* * */

export default function FrontendSection({ first = false, children }) {
  return (
    <div className={`${styles.container} ${first && styles.firstSection}`}>
      <div className={styles.innerWrapper}>{children}</div>
    </div>
  );
}
