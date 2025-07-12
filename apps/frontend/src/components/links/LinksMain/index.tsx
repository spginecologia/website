'use client';

/* * */

import { LinksFooter } from '@/src/components/links/LinksFooter';
import { LinksHeader } from '@/src/components/links/LinksHeader';
import { LinksList } from '@/src/components/links/LinksList';

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
