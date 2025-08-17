/* * */

import { HoverCard, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { Topic } from 'payload-types';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface TopicDisplayProps {
	asLink?: boolean
	data?: null | (string | Topic)
}

/* * */

export function TopicDisplay({ asLink = true, data }: TopicDisplayProps) {
	//

	//
	// A. Transform data

	const topicData = useMemo(() => {
		if (!data) return null;
		if (typeof data !== 'object') return null;
		return data;
	}, [data]);

	//
	// B. Render components

	if (!topicData) {
		return null;
	}

	if (!asLink) {
		return <p className={styles.topic}>{topicData.title}</p>;
	}

	return (
		<HoverCard openDelay={1000} shadow="md" width={250} withArrow>
			<HoverCard.Target>
				<UnstyledButton className={styles.topic} component={Link} href={`/topics/${topicData.id}`} target="_blank">{topicData.title}</UnstyledButton>
			</HoverCard.Target>
			<HoverCard.Dropdown>
				<Text variant="secondary">{topicData.description}</Text>
			</HoverCard.Dropdown>
		</HoverCard>
	);
}
