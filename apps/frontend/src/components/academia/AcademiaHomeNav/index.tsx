'use client';

/* * */

import { Section } from '@/components/common/Section';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

const LINKS = [
	{ key: 'guidelines', path: '/academia/guidelines' },
	{ key: 'videos', path: '/academia/videos' },
	{ key: 'publications', path: '/academia/publications' },
	{ key: 'courses', path: '/academia/courses' },
	{ key: 'grant', path: 'https://spginecologia.pt/bolsa/2025' },
	{ key: 'topics', path: 'https://spginecologia.pt/academia/topicos' },
] as const;

/* * */

export function AcademiaHomeNav() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<Section>
			<div className={styles.container}>
				{LINKS.map(link => (
					<a key={link.key} className={styles.link} href={link.path}>
						{t(`academia.AcademiaHomeNav.${link.key}`)}
					</a>
				))}
			</div>
		</Section>
	);

	//
}
