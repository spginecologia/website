import Image from 'next/image';

import styles from './styles.module.css';
import Link from 'next/link';
import config from '@/payload.config'
import { getPayloadHMR } from '@payloadcms/next/utilities';

/* * */

export default async function Component() {

	const payload = await getPayloadHMR({config})
	const footer = await payload.findGlobal({
		slug: 'footer',
	})

	return (
		<footer className={styles.footer}>
			<div className={styles.column}>
				<Image alt="Logotipo - Sociedade Portuguesa de Ginecologia" height={100} src={"/icons/spg-logo-white.svg"} width={100} />
				{/* <NewsletterForm /> */}
				<div className={styles.contact}>
					<Link href="tel:+351919494636">+351 919 494 636</Link>
					<Link href="mailto:secretariao@spginecologia.pt">secretariao@spginecologia.pt</Link>
					<Link href="https://www.spginecologia.pt">www.spginecologia.pt</Link>
				</div>
			</div>
		</footer>
	);
}
