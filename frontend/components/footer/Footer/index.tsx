/* * */

import { FooterContacts } from '@/components/footer/FooterContacts';
import { FooterLegal } from '@/components/footer/FooterLegal';
import { FooterLogo } from '@/components/footer/FooterLogo';
import { FooterNewsletter } from '@/components/footer/FooterNewsletter';

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
