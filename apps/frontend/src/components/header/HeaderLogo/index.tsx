/* * */

import { SpgLogoCompact } from '@/assets/spg';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function HeaderLogo() {
	return (
		<Link className={styles.container} href="https://spginecologia.pt">
			<SpgLogoCompact />
		</Link>
	);
}
