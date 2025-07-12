/* * */

import { FooterContacts } from '@/src/components/footer/FooterContacts';
import { FooterLegal } from '@/src/components/footer/FooterLegal';
import { FooterLogo } from '@/src/components/footer/FooterLogo';
import { FooterNewsletter } from '@/src/components/footer/FooterNewsletter';

import styles from './styles.module.css';

/* * */

export function Footer() {
	return (
		<footer className={styles.container}>
			<div className={styles.primaryWrapper}>
				<div className={styles.primary}>
					<FooterLogo />
					<FooterNewsletter />
					<FooterContacts />
				</div>
			</div>
			<div className={styles.secondaryWrapper}>
				<div className={styles.secondary}>
					<FooterLegal />
				</div>
			</div>
		</footer>
	);
}
