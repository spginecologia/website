'use client';

/* * */

import { Loader } from '@/src/components/common/Loader';
import Link from 'next/link';

import styles from './FrontendTopicTag.module.css';

/* * */

export default function FrontendTopicTag({ _id, noLink = false }) {
	//

	//
	// A. Setup variables

	const topicData = {
		_id: '398hhify2987b8ebn',
		title: 'Menopausa',
	};

	const topicLoading = false;

	//
	// B. Render components

	if (topicLoading) return <Loader visible />;

	if (noLink) return <div className={styles.tag}>{topicData.title}</div>;

	return (
		<Link className={styles.link} href={`/topics/${topicData._id}`}>
			{topicData.title}
		</Link>
	);

	//
}
