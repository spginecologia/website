/* * */

import type { Topic } from '@/payload-types';

import { CardSummary } from '@/components/cards/CardSummary';
import { CardWrapper } from '@/components/cards/CardWrapper';
import { TopicDisplay } from '@/components/topics/TopicDisplay';
import { VideoCoverImage } from '@/components/videos/VideoCoverImage';
import { Title } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	authors?: null | string
	coverSrc?: null | string
	duration?: null | number
	href?: string
	summary?: null | string
	title?: null | string
	topic?: null | Topic
	views?: null | number
}

/* * */

export function VideoCardFeatured({ authors, coverSrc, duration, href, summary, title, topic, views }: Props) {
	return (
		<CardWrapper fullHeight href={href} variant="featured">
			{topic && <TopicDisplay id={topic.id} noLink title={topic.title} />}
			<div />
			<VideoCoverImage coverSrc={coverSrc} duration={duration} views={views} />
			<div />
			<Title order={2} size="sm">{title}</Title>
			{authors && <p className={styles.authors}>{authors}</p>}
			<CardSummary size="sm" text={summary} />
		</CardWrapper>
	);
}
