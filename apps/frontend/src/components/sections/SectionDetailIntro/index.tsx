'use client';

/* * */

import { Section } from '@/src/components/common/Section';
import { Image, Text, Title } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	goalDescription?: null | string
	imageSrc?: null | string
	introText?: null | string
	projectDescription?: null | string
}

/* * */

export function SectionDetailIntro({ goalDescription, imageSrc, introText, projectDescription }: Props) {
	//

	return (
		<div className={styles.container}>
			<Section withTopSpacer="transparent">
				<div className={styles.box}>
					<Image className={styles.image} src={imageSrc} />
					<Title id={styles.title} order={2}>{introText}</Title>
				</div>
			</Section>
			<Section withPadding>
				<div className={styles.grid}>
					<div className={styles.column}>
						<Title id={styles.subtitle} order={2}>O nosso projeto</Title>
						<Text id={styles.description}>{projectDescription}</Text>
					</div>
					<div className={styles.column}>
						<Title id={styles.subtitle} order={2}>Para onde vamos</Title>
						<Text id={styles.description}>{goalDescription}</Text>
					</div>
				</div>
			</Section>
		</div>
	);

	//
}
