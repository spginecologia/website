/* * */

import Link from 'next-intl/link';
import styles from './FrontendFooterLogo.module.css';
import { SpgLogoWhite } from '@/assets/spg';

/* * */

export default function FrontendFooterLogo() {
  return (
    <Link href="/" className={styles.container}>
      <SpgLogoWhite />
    </Link>
  );
}
