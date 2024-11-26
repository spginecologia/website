/* * */

import { SpgLogoCompact } from '@/assets/spg';
import styles from './OtherLinksHeader.module.css';

/* * */

export default function OtherLinksHeader() {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <SpgLogoCompact />
      </div>
    </div>
  );
}
