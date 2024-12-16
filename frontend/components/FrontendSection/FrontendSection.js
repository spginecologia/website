/* * */

import styles from './FrontendSection.module.css';

/* * */

export default function FrontendSection({ children, first = false, title = '' }) {
	return (
		<div className={`${styles.container} ${first && styles.firstSection}`}>
			<div className={styles.innerWrapper}>
				{title && <h1 className={styles.title}>{title}</h1>}
				{children}
			</div>
		</div>
	);
}
