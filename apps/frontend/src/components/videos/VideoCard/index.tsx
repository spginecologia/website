/* * */

import { CardSummary } from '@/components/cards/CardSummary';
import { CardWrapper } from '@/components/cards/CardWrapper';
import { TopicDisplay } from '@/components/topics/TopicDisplay';
import { VideoCoverImage } from '@/components/videos/VideoCoverImage';
import { Title } from '@mantine/core';
import { type Topic } from 'payload-types';

import styles from './styles.module.css';

/* * */

interface VideoCardProps {
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

export function VideoCard({ authors, coverSrc, duration, href, summary, title, topic, views }: VideoCardProps) {
	return (
		<CardWrapper href={href} variant="default">
			<VideoCoverImage coverSrc={coverSrc} duration={duration} views={views} />
			<div />
			{topic && <TopicDisplay asLink={false} data={topic} />}
			<Title order={2} size="sm">{title}</Title>
			{authors && <p className={styles.authors}>{authors}</p>}
			<CardSummary size="sm" text={summary} />
		</CardWrapper>
	);
}
