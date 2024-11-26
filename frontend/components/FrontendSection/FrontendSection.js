/* * */

import styles from './FrontendSection.module.css';

/* * */

export default function FrontendSection({ first = false, title = '', children }) {
  return (
    <div className={`${styles.container} ${first && styles.firstSection}`}>
      <div className={styles.innerWrapper}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
      </div>
    </div>
  );
}
