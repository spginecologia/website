/* * */

import type { Topic } from '@/payload-types';

import { CardPublishDate } from '@/src/components/cards/CardPublishDate';
import { CardWrapper } from '@/src/components/cards/CardWrapper';
import { TopicDisplay } from '@/src/components/topics/TopicDisplay';
import { Text, Title } from '@mantine/core';
import Image from 'next/image';

import styles from './styles.module.css';

/* * */

interface Props {
	coverSrc?: null | string
	href?: string
	publishDate?: Date | null
	summary?: null | string
	title?: null | string
	topic?: null | Topic
}

/* * */

export function NewsCardFeatured({ coverSrc, href, publishDate, summary, title, topic }: Props) {
	return (
		<CardWrapper className={styles.container} href={href} variant="featured">
			<div className={styles.imageWrapper}>
				{coverSrc && <Image alt="" src={coverSrc} style={{ objectFit: 'cover' }} fill />}
			</div>
			<div className={styles.contentWrapper}>
				{topic && <TopicDisplay id={topic.id} title={topic.title} noLink />}
				<Title order={2}>{title}</Title>
				<Text>{summary}</Text>
				<CardPublishDate date={publishDate} />
			</div>
		</CardWrapper>
	);
}
