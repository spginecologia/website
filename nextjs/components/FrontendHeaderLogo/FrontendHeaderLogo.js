/* * */

import { Link } from '@/translations/navigation';
import styles from './FrontendHeaderLogo.module.css';
import { SpgLogoCompact } from '@/assets/spg';

/* * */

export default function FrontendHeaderLogo() {
  return (
    <Link href="/" className={styles.container}>
      <SpgLogoCompact />
    </Link>
  );
}
