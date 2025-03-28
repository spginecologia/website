'use client';

/* * */

import { SpgAcademia } from '@/assets/spg';
import { IconBooks, IconBrandYoutube, IconBuildingCottage, IconBulb, IconFileCheck, IconListSearch, IconSchool, IconVideoPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

const ACADEMIA_PAGES = [
	{ icon: <IconBuildingCottage size={20} />, key: 'home', path: 'https://spginecologia.pt/academia' },
	{ icon: <IconBrandYoutube size={22} />, key: 'videos', path: 'https://spginecologia.pt/academia/videos' },
	{ icon: <IconVideoPlus size={24} />, key: 'videos_new', path: 'https://spginecologia.pt/academia/videos/new' },
	{ icon: <IconFileCheck size={24} />, key: 'guidelines', path: '/guidelines' },
	{ icon: <IconBooks size={24} />, key: 'publications', path: 'https://spginecologia.pt/academia/publicacoes' },
	{ icon: <IconSchool size={24} />, key: 'courses', path: 'https://spginecologia.pt/academia/palestras-cursos' },
	{ icon: <IconBulb size={24} />, key: 'grant', path: 'https://spginecologia.pt/bolsa/2025' },
	{ icon: <IconListSearch size={24} />, key: 'topics', path: 'https://spginecologia.pt/academia/topicos' },
];

/* * */

export function HeaderAcademia() {
	//

	//
	// A. Setup variables

	const t = useTranslations('header.HeaderAcademia');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Link className={styles.target} href="https://spginecologia.pt/academia">
				<SpgAcademia />
			</Link>

			<div className={styles.dropdown}>
				{ACADEMIA_PAGES.map(item => (
					<Link key={item.key} className={styles.dropdownLink} href={item.path}>
						<span className={styles.dropdownLinkIcon}>{item.icon}</span>
						<span className={styles.dropdownLinkLabel}>{t(`${item.key}.label`)}</span>
					</Link>
				))}
			</div>
		</div>
	);

	//
}
