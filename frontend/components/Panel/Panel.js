/* * */

import { Loader } from '@/components/common/Loader';

import styles from './Panel.module.css';

/* * */

export default function Panel({ children, loading = false }) {
	return (
		<div className={styles.container}>
			<Loader visible={loading} full />
			{children}
		</div>
	);
}
