/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	heading?: string
	variant?: 'default' | 'primary' | 'secondary'
	paddingY?: number
	paddingX?: number
	className?: string
}

/* * */

export function Section({ children, heading, variant = 'default', paddingY, paddingX, className }: Props) {
	return (
		<section className={`${styles.section} ${styles[variant]} ${className}`}>
			<div className={styles.contentWrapper}>
				<div className={styles.content} style={{ paddingTop: paddingY, paddingBottom: paddingY, paddingLeft: paddingX, paddingRight: paddingX }}>
					{heading && <h1 className={styles.heading}>{heading}</h1>}
					{children}
				</div>
			</div>
		</section>
	);
}
