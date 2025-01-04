'use client';

/* * */

import { CardWrapper } from '@/components/cards/CardWrapper';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	imageSrc?: null | string
	slug?: null | string
}

/* * */

export function SectionsSelectorItem({ imageSrc, slug }: Props) {
	//

	if (!imageSrc) {
		return null;
	}

	return (
		<CardWrapper href={`/sections/${slug}`}>
			<Image className={styles.image} src={imageSrc} />
		</CardWrapper>
	);

	//
}
