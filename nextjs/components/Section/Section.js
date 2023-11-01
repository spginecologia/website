/* * */

import styles from './Section.module.css';

/* * */

export default function Section({ first = false, children }) {
  return (
    <div className={`${styles.container} ${first && styles.firstSection}`}>
      <div className={styles.innerWrapper}>{children}</div>
    </div>
  );
}
