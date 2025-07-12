'use client';

/* * */

import { CardWrapper } from '@/src/components/cards/CardWrapper';
import { Image, Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	imageSrc?: null | string
	slug?: null | string
}

/* * */

export function SectionsSelectorItem({ imageSrc, slug }: Props) {
	//

	if (!imageSrc || !slug) {
		return <Skeleton style={{ aspectRatio: '3 / 4' }} />;
	}

	return (
		<CardWrapper href={`/sections/${slug}`}>
			<Image className={styles.image} src={imageSrc} />
		</CardWrapper>
	);

	//
}
