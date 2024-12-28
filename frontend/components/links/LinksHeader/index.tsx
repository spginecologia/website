/* * */

import { SpgLogoCompact } from '@/assets/spg';

import styles from './styles.module.css';

/* * */

export function LinksHeader() {
	return (
		<div className={styles.container}>
			<div className={styles.logoWrapper}>
				<SpgLogoCompact />
			</div>
		</div>
	);
}
