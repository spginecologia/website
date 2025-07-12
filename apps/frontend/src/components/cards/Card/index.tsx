/* * */

import { CardCoverImage } from '@/src/components/cards/CardCoverImage';
import { CardPublishDate } from '@/src/components/cards/CardPublishDate';
import { CardTitle } from '@/src/components/cards/CardTitle';
import { CardWrapper } from '@/src/components/cards/CardWrapper';

/* * */

interface Props {
	coverAspectRatio?: string
	coverSrc?: null | string
	href?: string
	publishDate?: Date | null
	target?: '_blank' | '_self'
	title?: null | string
}

/* * */

export function Card({ coverAspectRatio, coverSrc, href, publishDate, target, title }: Props) {
	//

	return (
		<CardWrapper href={href} target={target}>
			<CardCoverImage aspectRatio={coverAspectRatio} src={coverSrc} />
			<CardTitle text={title} variant="default" />
			<CardPublishDate date={publishDate} />
		</CardWrapper>
	);

	//
}
