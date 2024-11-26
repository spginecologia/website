import config from '@/payload.config';
import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';

import styles from './styles.module.css';

/* * */

export default async function Component() {
	const payload = await getPayload({ config });
	const footer = await payload.findGlobal({
		slug: 'footer',
	});

	return (
		<footer className={styles.footer}>
			<div className={styles.content}>
				<Image alt="Logotipo - Sociedade Portuguesa de Ginecologia" className={styles.logo} height={100} src="/icons/spg-logo-white.svg" width={100} />
				{/* <NewsletterForm /> */}
				<div />
				<div className={styles.right}>
					<div className={styles.contact}>
						<Link className={styles.contactItem} href="tel:+351919494636">+351 919 494 636</Link>
						<Link className={styles.contactItem} href="mailto:secretariao@spginecologia.pt">secretariao@spginecologia.pt</Link>
						<Link className={styles.contactItem} href="mailto:academia@spginecologia.pt">academia@spginecologia.pt</Link>
					</div>
					<div className={styles.social}>
						<Link href="https://www.facebook.com/spginecologia"><Image alt="Facebook" height={36} src="/icons/facebook.svg" width={36} /></Link>
						<Link href="https://www.instagram.com/spginecologia"><Image alt="Instagram" height={36} src="/icons/instagram.svg" width={36} /></Link>
						<Link href="https://www.linkedin.com/company/spginecologia"><Image alt="LinkedIn" height={36} src="/icons/linkedin.svg" width={36} /></Link>
					</div>
					<div className={styles.address}>
						<div className={styles.addressTitle}>Sede Social</div>
						<div>Edifício Cruzeiro 4 — 2º andar, sala 32</div>
						<div>Largo Cruz de Celas — 3000-132 Coimbra</div>
						<div>Portugal</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
