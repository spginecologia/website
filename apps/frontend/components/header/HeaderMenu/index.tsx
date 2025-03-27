'use client';

/* * */

import { IconSearch } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

const MENU_PAGES = [
	{ key: 'society', path: '/society' },
	{ key: 'sections', path: 'https://spginecologia.pt/seccoes' },
	{ key: 'workgroups', path: 'https://spginecologia.pt/nucleos' },
	{ key: 'news', path: 'https://spginecologia.pt/noticias' },
	{ key: 'agenda', path: 'https://spginecologia.pt/agenda' },
	{ key: 'award', path: 'https://spginecologia.pt/premio/2025' },
];

/* * */

export function HeaderMenu() {
	//

	//
	// A. Setup variables

	const t = useTranslations('header.HeaderMenu');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			{MENU_PAGES.map(item => (
				<Link key={item.key} className={styles.link} href={item.path}>
					{t(`${item.key}.label`)}
				</Link>
			))}
			<Link className={styles.search} href="https://spginecologia.pt/academia/topicos">
				<IconSearch size={18} />
			</Link>
		</div>
	);

	//
}
