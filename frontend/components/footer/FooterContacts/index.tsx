'use client';

/* * */

import { Facebook, Instagram, LinkedIn } from '@/assets/socials';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function FooterContacts() {
	//

	//
	// A. Setup variables

	const t = useTranslations('footer.FooterContacts');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.contacts}>
				<a className={styles.contactItem} href="tel:+351218429710">
					+351 218 429 710
				</a>
				<a className={styles.contactItem} href="mailto:secretariado@spginecologia.pt">
					secretariado@spginecologia.pt
				</a>
				<a className={styles.contactItem} href="mailto:academia@spginecologia.pt">
					academia@spginecologia.pt
				</a>
			</div>
			<div className={styles.socials}>
				<a href="https://www.facebook.com/spginecologia" target="_blank">
					<Facebook />
				</a>
				<a href="https://www.instagram.com/spginecologia" target="_blank">
					<Instagram />
				</a>
				<a href="https://www.linkedin.com/company/spginecologia" target="_blank">
					<LinkedIn />
				</a>
			</div>
			<div className={styles.address}>
				<p className={styles.addressTitle}>{t('address.title')}</p>
				<p className={styles.addressLine}>Edifício Cruzeiro 4 — 2º andar, sala 32</p>
				<p className={styles.addressLine}>Largo Cruz de Celas — 3000-132 Coimbra</p>
				<p className={styles.addressLine}>Portugal</p>
			</div>
		</div>
	);

	//
}
