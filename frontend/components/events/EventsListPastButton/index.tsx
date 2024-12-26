/* * */

import { Title } from '@mantine/core';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function EventsListPastButton() {
	return (
		<Link className={styles.container} href="/agenda/past">
			<div className={styles.topImage} />
			<Title id={styles.title} order={2}>Recorde os<br />nossos eventos<br />anteriores ›</Title>
			<div className={styles.bottomImage} />
		</Link>
	);
}
