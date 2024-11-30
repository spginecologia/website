/* * */

import { SpgLogoWhite } from '@/assets/spg';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function FooterLogo() {
	return (
		<Link className={styles.container} href="/">
			<SpgLogoWhite />
		</Link>
	);
}
