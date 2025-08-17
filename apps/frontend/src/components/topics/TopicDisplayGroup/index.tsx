'use client';

/* * */

import { TopicDisplay } from '@/components/topics/TopicDisplay';
import { type Topic } from 'payload-types';

import styles from './styles.module.css';

/* * */

interface TopicDisplayGroupProps {
	asLink?: boolean
	topics?: (string | Topic)[] | null
}

/* * */

export function TopicDisplayGroup({ asLink = true, topics }: TopicDisplayGroupProps) {
	//

	if (!topics || topics.length === 0) {
		return null;
	}

	return (
		<div className={styles.group}>
			{topics.map(item => (
				<TopicDisplay
					key={typeof item === 'string' ? item : item.id}
					asLink={asLink}
					data={item}
				/>
			))}
		</div>
	);

	//
}
