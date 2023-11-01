/* * */

import styles from './Panel.module.css';
import Loader from '@/components/Loader/Loader';

/* * */

export default function Panel({ loading = false, children }) {
  return (
    <div className={styles.container}>
      <Loader visible={loading} full />
      {children}
    </div>
  );
}
