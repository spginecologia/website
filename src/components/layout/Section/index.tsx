/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	heading?: string
	variant?: 'default' | 'primary' | 'secondary'
}

/* * */

export function Section({ children, heading, variant = 'default' }: Props) {
	return (
		<section className={`${styles.section} ${styles[variant]}`}>
			<div className={styles.contentWrapper}>
				<div className={styles.content}>
					{heading && <h1 className={styles.heading}>{heading}</h1>}
					{children}
				</div>
			</div>
		</section>
	);
}
