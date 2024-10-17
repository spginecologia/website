import { Skeleton } from '@/components/common/Skeleton';
import classNames from 'classnames';

import styles from './styles.module.css';

/* * */
export default function CardSkeleton() {
	return (
		<div aria-label="Card" className={classNames(styles.card)}>
			<Skeleton height={200} width="100%" />
			<div className={styles.content}>
				<Skeleton height={18} width="80%" />
				<Skeleton height={10} width="30%" />
				<Skeleton height={10} width="50%" />
			</div>
		</div>
	);
}
