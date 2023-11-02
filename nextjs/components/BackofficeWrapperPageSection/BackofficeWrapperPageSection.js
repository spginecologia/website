/* * */

import styles from './BackofficeWrapperPageSection.module.css';

/* * */

export default function BackofficeWrapperPageSection({ title, subtitle, children }) {
  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
