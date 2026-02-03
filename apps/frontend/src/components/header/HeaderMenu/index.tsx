'use client';

/* * */

import { ACADEMIA_PAGES } from '@/components/header/HeaderAcademia';
import { Drawer } from '@mantine/core';
import { IconMenuDeep, IconSearch, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

	const { t } = useTranslation();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	//
	// B. Render components

	return (
		<>

			<div className={styles.container} data-desktop>
				{MENU_PAGES.map(item => (
					<Link key={item.key} className={styles.link} href={item.path}>
						{/* {t('')} */}
						{t(`header.HeaderMenu.${item.key}.label`)}
					</Link>
				))}
				<Link className={styles.search} href="https://spginecologia.pt/academia/topicos">
					<IconSearch size={18} />
				</Link>
			</div>

			<Drawer
				classNames={{ body: styles.drawerBody, content: styles.drawerContent }}
				onClose={() => setIsDrawerOpen((false))}
				opened={isDrawerOpen}
				position="right"
				withCloseButton={false}
			>
				<div className={styles.closeDrawer} onClick={() => setIsDrawerOpen(false)}>
					<IconX size={35} />
				</div>
				{[...MENU_PAGES, ...ACADEMIA_PAGES].map(item => (
					<Link key={item.key} className={styles.link} href={item.path}>
						{t(`default:header.HeaderMenu.${item.key}.label`)}
					</Link>
				))}
			</Drawer>

			<div className={styles.container} data-mobile>
				<div className={styles.openDrawer} onClick={() => setIsDrawerOpen(true)}>
					<IconMenuDeep size={35} />
				</div>
			</div>

		</>
	);

	//
}
