/* * */

import { CardCoverImage } from '@/components/cards/CardCoverImage';
import { CardPublishDate } from '@/components/cards/CardPublishDate';
import { CardWrapper } from '@/components/cards/CardWrapper';
import { TopicDisplay } from '@/components/topics/TopicDisplay';
import { Title } from '@mantine/core';
import { type Topic } from 'payload-types';

import styles from './styles.module.css';

/* * */

interface CourseCardProps {
	coverSrc?: null | string
	href?: string
	publishDate?: Date | null
	title?: null | string
	topic?: null | Topic
}

/* * */

export function CourseCard({ coverSrc, href, publishDate, title, topic }: CourseCardProps) {
	return (
		<CardWrapper className={styles.container} href={href} variant="featured">
			<CardCoverImage aspectRatio="600 / 300" src={coverSrc} withShadow={false} />
			<div className={styles.contentWrapper}>
				{topic && <TopicDisplay asLink={false} data={topic} />}
				<Title order={2} size="sm">{title}</Title>
				<CardPublishDate date={publishDate} />
			</div>
		</CardWrapper>
	);
}
