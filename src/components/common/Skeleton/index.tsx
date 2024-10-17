/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	height?: number | string
	width?: number | string
}

function Skeleton({ height, width }: Props) {
	return (
		<div className={styles.skeleton} style={{ height, width }} />
	);
}

export { Skeleton };
