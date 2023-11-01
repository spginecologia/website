/* * */

import Link from 'next-intl/link';
import styles from './AppHeaderLogo.module.css';
import { SpgLogoCompact } from '@/assets/spg';

/* * */

export default function AppHeaderLogo() {
  return (
    <Link href="/" className={styles.container}>
      <SpgLogoCompact />
    </Link>
  );
}
