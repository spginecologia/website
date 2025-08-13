/* * */

import { Image, Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	aspectRatio?: string
	src?: null | string
	withShadow?: boolean
}

/* * */

export function CardCoverImage({ aspectRatio, src, withShadow = true }: Props) {
	//

	if (!src) {
		return <Skeleton style={{ aspectRatio: aspectRatio }} animate />;
	}

	return (
		<div>
			<Image className={styles.cover} data-with-shadow={withShadow} src={src} style={{ aspectRatio: aspectRatio }} />
		</div>
	);

	//
}
