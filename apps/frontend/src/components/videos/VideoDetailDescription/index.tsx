'use client';

/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	description?: null | string
}

/* * */

export function VideoDetailDescription({ description }: Props) {
	//

	if (!description) {
		return <div>Loading...</div>;
	}

	return (
		<p className={styles.description}>
			{description}
		</p>
	);

	//
}
