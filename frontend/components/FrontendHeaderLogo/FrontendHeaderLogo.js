/* * */

import { SpgLogoCompact } from '@/assets/spg';
import Link from 'next/link';

import styles from './FrontendHeaderLogo.module.css';

/* * */

export default function FrontendHeaderLogo() {
	return (
		<Link className={styles.container} href="/">
			<SpgLogoCompact />
		</Link>
	);
}
