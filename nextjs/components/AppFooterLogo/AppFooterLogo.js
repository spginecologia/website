/* * */

import Link from 'next-intl/link';
import styles from './AppFooterLogo.module.css';
import { SpgLogoWhite } from '@/assets/spg';

/* * */

export default function AppFooterLogo() {
  return (
    <Link href="/frontend" className={styles.container}>
      <SpgLogoWhite />
    </Link>
  );
}
