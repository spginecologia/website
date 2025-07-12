/* * */

import { CardCoverImage } from '@/src/components/cards/CardCoverImage';
import { CardPublishDate } from '@/src/components/cards/CardPublishDate';
import { CardSummary } from '@/src/components/cards/CardSummary';
import { CardTitle } from '@/src/components/cards/CardTitle';
import { CardWrapper } from '@/src/components/cards/CardWrapper';
import { TopicDisplay } from '@/src/components/topics/TopicDisplay';
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
