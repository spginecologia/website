/* * */

import { CardCoverImage } from '@/components/cards/CardCoverImage';
import { CardWrapper } from '@/components/cards/CardWrapper';
import { DateRibbon } from '@/components/events/DateRibbon';
import { TopicDisplay } from '@/components/topics/TopicDisplay';
import { Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { type Topic } from 'payload-types';

import styles from './styles.module.css';

/* * */

interface Props {
	coverSrc?: null | string
	endDate?: Date | null
	href?: string
	startDate?: Date | null
	title?: null | string
	topic?: null | Topic
}

/* * */

export function EventCard({ coverSrc, endDate, href, startDate, title, topic }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('events.EventCard');

	//
	// B. Render components

	return (
		<CardWrapper className={styles.container} href={href} variant="featured" fullHeight>
			<CardCoverImage aspectRatio="900 / 400" src={coverSrc} />
			<div className={styles.bottomWrapper}>
				<DateRibbon date={startDate} />
				<div className={styles.contentWrapper}>
					{topic && <TopicDisplay asLink={false} data={topic} />}
					<Title order={2} size="sm">{title}</Title>
					<div className={styles.datesWrapper}>
						{startDate && <Text size="sm">{t('start_date', { value: startDate })}</Text>}
						{endDate && <Text size="sm">{t('end_date', { value: endDate })}</Text>}
					</div>
				</div>
			</div>
		</CardWrapper>
	);

	//
}
