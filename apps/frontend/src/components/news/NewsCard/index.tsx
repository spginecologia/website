/* * */

import { CardCoverImage } from '@/components/cards/CardCoverImage';
import { CardPublishDate } from '@/components/cards/CardPublishDate';
import { CardSummary } from '@/components/cards/CardSummary';
import { CardTitle } from '@/components/cards/CardTitle';
import { CardWrapper } from '@/components/cards/CardWrapper';
import { TopicDisplay } from '@/components/topics/TopicDisplay';
import { Topic } from '@/payload-types';

/* * */

interface Props {
	coverSrc?: null | string
	href?: string
	publishDate?: Date | null
	summary?: null | string
	target?: '_blank' | '_self'
	title?: null | string
	topic?: null | Topic
}

/* * */

export function NewsCard({ coverSrc, href, publishDate, summary, title, topic }: Props) {
	//

	return (
		<CardWrapper href={href} variant="default">
			<CardCoverImage aspectRatio="16/9" src={coverSrc} />
			{topic && <TopicDisplay id={topic.id} title={topic.title} noLink />}
			<CardTitle text={title} variant="serif" />
			<CardSummary text={summary} />
			<CardPublishDate date={publishDate} />
		</CardWrapper>
	);

	//
}
