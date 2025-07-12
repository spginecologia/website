/* * */

import type { Topic } from '@/payload-types';

import { CardCoverImage } from '@/components/cards/CardCoverImage';
import { CardPublishDate } from '@/components/cards/CardPublishDate';
import { CardWrapper } from '@/components/cards/CardWrapper';
import { TopicDisplay } from '@/components/topics/TopicDisplay';
import { Title } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	coverSrc?: null | string
	href?: string
	publishDate?: Date | null
	title?: null | string
	topic?: null | Topic
}

/* * */

export function CourseCard({ coverSrc, href, publishDate, title, topic }: Props) {
	return (
		<CardWrapper className={styles.container} href={href} variant="featured">
			<CardCoverImage aspectRatio="600 / 300" src={coverSrc} />
			<div className={styles.contentWrapper}>
				{topic && <TopicDisplay id={topic.id} noLink title={topic.title} />}
				<Title order={2} size="sm">{title}</Title>
				<CardPublishDate date={publishDate} />
			</div>
		</CardWrapper>
	);
}
