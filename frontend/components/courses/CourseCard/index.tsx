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
	summary?: null | string
	title?: null | string
	topic?: null | Topic
}

/* * */

export function CourseCard({ coverSrc, href, publishDate, summary, title, topic }: Props) {
	return (
		<CardWrapper className={styles.container} href={href} variant="featured">
			<CardCoverImage aspectRatio="585 / 320" src={coverSrc} />
			<div className={styles.contentWrapper}>
				{topic && <TopicDisplay id={topic.id} title={topic.title} noLink />}
				<Title order={2} size="sm">{title}</Title>
				<CardPublishDate date={publishDate} />
			</div>
		</CardWrapper>
	);
}
