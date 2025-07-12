/* * */

import { CardWrapper } from '@/src/components/cards/CardWrapper';
import { VideoCoverImage } from '@/src/components/videos/VideoCoverImage';
import { Title } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	authors?: null | string
	coverSrc?: null | string
	duration?: null | number
	href?: string
	title?: null | string
}

/* * */

export function VideoCardRelated({ authors, coverSrc, duration, href, title }: Props) {
	return (
		<CardWrapper className={styles.container} href={href} variant="compact">
			<VideoCoverImage coverSrc={coverSrc} duration={duration} />
			<div className={styles.contentWrapper}>
				<Title order={2} size="xs">{title}</Title>
				{authors && <p className={styles.authors}>{authors}</p>}
			</div>
		</CardWrapper>
	);
}
