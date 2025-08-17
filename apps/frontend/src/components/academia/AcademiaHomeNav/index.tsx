'use client';

/* * */

import { Section } from '@/components/common/Section';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const LINKS = [
	{ key: 'guidelines', path: '/academia/guidelines' },
	{ key: 'videos', path: '/academia/videos' },
	{ key: 'publications', path: '/academia/publicacoes' },
	{ key: 'courses', path: '/academia/palestras-cursos' },
	{ key: 'grant', path: 'https://spginecologia.pt/bolsa/2025' },
	{ key: 'topics', path: 'https://spginecologia.pt/academia/topicos' },
];

/* * */

export function AcademiaHomeNav() {
	//

	//
	// A. Setup variables

	const t = useTranslations('academia.AcademiaHomeNav');

	//
	// B. Render components

	return (
		<Section>
			<div className={styles.container}>
				{LINKS.map(link => (
					<a key={link.key} className={styles.link} href={link.path}>
						{t(link.key)}
					</a>
				))}
			</div>
		</Section>
	);

	//
}
