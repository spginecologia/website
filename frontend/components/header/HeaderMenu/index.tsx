'use client';

/* * */

import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const MENU_PAGES = [
	{ key: 'society', path: '/society' },
	{ key: 'sections', path: '/sections' },
	{ key: 'workgroups', path: '/workgroups' },
	{ key: 'news', path: '/news' },
	{ key: 'agenda', path: '/agenda' },
	{ key: 'award', path: '/award' },
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
			<Link className={styles.search} href="/academia/topics">
				<IconSearch size={18} />
			</Link>
		</div>
	);
}
