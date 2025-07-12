'use client';

/* * */

import { Skeleton, Title } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	authors?: null | string
	introduction?: null | string
	title?: null | string
}

/* * */

export function VideoDetailMetadata({ authors, introduction, title }: Props) {
	//

	if (!title || !authors || !introduction) {
		return (
			<div className={styles.container}>
				<Skeleton animate h={50} />
				<Skeleton animate h={30} />
				<Skeleton animate h={150} mt={15} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Title order={2}>{title}</Title>
			<p className={styles.authors}>{authors}</p>
			<p className={styles.introduction}>{introduction}</p>
		</div>
	);

	//
}
