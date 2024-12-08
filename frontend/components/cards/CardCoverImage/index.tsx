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
		return <Skeleton style={{ aspectRatio: aspectRatio }} animate />;
	}

	return <Image className={styles.cover} src={src} style={{ aspectRatio: aspectRatio }} />;

	//
}
