/* * */

import { Button, HoverCard, Text } from '@mantine/core';
import Link from 'next/link';

/* * */

interface Props {
	description?: null | string
	id: string
	title: string
}

/* * */

export function TopicDisplay({ description, id, title }: Props) {
	//

	//
	// A. Render components

	if (!description) {
		return <Button component={Link} href={`/topics/${id}`} variant="link">{title}</Button>;
	}

	return (
		<HoverCard openDelay={1000} shadow="md" width={250} withArrow>
			<HoverCard.Target>
				<Button component={Link} href={`/topics/${id}`} variant="link">{title}</Button>
			</HoverCard.Target>
			<HoverCard.Dropdown>
				<Text variant="secondary">{description}</Text>
			</HoverCard.Dropdown>
		</HoverCard>
	);
}
