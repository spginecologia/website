/* * */

import styles from './BackofficeWrapperLayout.module.css';

/* * */

export default function BackofficeWrapperLayout({ list, page }) {
  return (
    <div className={styles.container}>
      <div className={styles.listWrapper}>{list}</div>
      <div className={styles.pageWrapper}>{page}</div>
    </div>
  );
}
