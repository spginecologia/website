/* * */

import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export function AcademiaBanner() {
	return (
		<div className={styles.container}>
			<div className={styles.innerWrapper}>
				<div className={styles.decorativeImage} />
				<Image className={styles.academiaLogo} src="/brand/academia/spg-academia-logo-white.svg" />
			</div>
		</div>
	);
}
