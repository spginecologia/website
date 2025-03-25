'use client';

/* * */

import { LinksFooter } from '@/components/links/LinksFooter';
import { LinksHeader } from '@/components/links/LinksHeader';
import { LinksList } from '@/components/links/LinksList';

import styles from './styles.module.css';

/* * */

export function LinksMain() {
	return (
		<div className={styles.container}>
			<LinksHeader />
			<LinksList />
			<LinksFooter />
		</div>
	);
}
