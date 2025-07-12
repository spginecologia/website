/* * */

import { HeaderAcademia } from '@/src/components/header/HeaderAcademia';
import { HeaderBreadcrumbs } from '@/src/components/header/HeaderBreadcrumbs';
import { HeaderLogo } from '@/src/components/header/HeaderLogo';
import { HeaderMenu } from '@/src/components/header/HeaderMenu';
import { HeaderUser } from '@/src/components/header/HeaderUser';
import { Space } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export function Header() {
	return (
		<>

			<div className={styles.container} data-desktop>
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
				<div className={styles.secondaryWrapper}>
					<div className={styles.secondary}>
						<HeaderBreadcrumbs />
					</div>
				</div>
			</div>

			<div className={styles.container} data-mobile>
				<div className={styles.primaryWrapper}>
					<div className={styles.primary}>
						<HeaderLogo />
						<Space w="100%" />
						<HeaderUser />
						<HeaderMenu />
					</div>
				</div>
			</div>

		</>
	);
}
