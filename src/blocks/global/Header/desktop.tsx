'use client';

import Image from 'next/image';
import Link from 'next/link';

import styles from './desktop.module.css';
import { Header, Media } from '@/payload-types';

export default function Component({ header } : { header: Header }) {

	//
	// B. Render Components
	return (
		<nav className={styles.nav}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<Link href={'/'}>
						<Image alt={(header.logo as Media)?.alt ?? ""} height={100} src={(header.logo as Media)?.url ?? ""} width={150} />
					</Link>
				</div>
				<div className={styles.links}>
					{header.navigation_items?.map((item) => (
						<Link key={item.label} href={item.url}>
							{item.label}
						</Link>
					))}
				</div>
				<div className={styles.academy}>
					{/* <Academy /> */}
					{/* <Account /> */}
				</div>
			</div>
		</nav>
	);
}
