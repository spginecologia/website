/* * */

import { Image, Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	aspectRatio?: string
	src?: null | string
}

/* * */

export function CardCoverImage({ aspectRatio, src }: Props) {
	//

	if (!src) {
		return <Skeleton animate style={{ aspectRatio: aspectRatio }} />;
	}

	return (
		<div>
			<Image className={styles.cover} src={src} style={{ aspectRatio: aspectRatio }} />
		</div>
	);

	//
}
