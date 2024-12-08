/* * */

import { HoverCard, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	description?: null | string
	id: string
	noLink?: boolean
	title: string
}

/* * */

export function TopicDisplay({ description, id, noLink = false, title }: Props) {
	//

	//
	// A. Render components

	if (noLink) {
		return <p className={styles.topic}>{title}</p>;
	}

	if (!description) {
		return <Link className={styles.topic} href={`/topics/${id}`}>{title}</Link>;
	}

	return (
		<HoverCard openDelay={1000} shadow="md" width={250} withArrow>
			<HoverCard.Target>
				<UnstyledButton className={styles.topic} component={Link} href={`/topics/${id}`}>{title}</UnstyledButton>
			</HoverCard.Target>
			<HoverCard.Dropdown>
				<Text variant="secondary">{description}</Text>
			</HoverCard.Dropdown>
		</HoverCard>
	);
}
