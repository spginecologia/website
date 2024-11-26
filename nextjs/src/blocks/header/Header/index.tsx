'use client';

/* * */

import { HeaderAcademia } from '@/blocks/header/HeaderAcademia';
import { HeaderBreadcrumbs } from '@/blocks/header/HeaderBreadcrumbs';
import { HeaderLogo } from '@/blocks/header/HeaderLogo';
import { HeaderMenu } from '@/blocks/header/HeaderMenu';
import { HeaderUser } from '@/blocks/header/HeaderUser';

import styles from './styles.module.css';

/* * */

export function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.primaryWrapper}>
				<div className={styles.primary}>
					<HeaderLogo />
					<HeaderMenu />
					<div className={styles.buttons}>
						<HeaderAcademia />
						<HeaderUser />
					</div>
				</div>
			</div>
			{/* <div className={styles.secondaryWrapper}>
				<div className={styles.secondary}>
					<HeaderBreadcrumbs />
				</div>
			</div> */}
		</div>
	);
}
