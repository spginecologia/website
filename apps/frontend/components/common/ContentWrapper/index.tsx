/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
	className?: string
	withGap?: boolean
}
/* * */

export function ContentWrapper({ children, className = '', withGap = true }: Props) {
	return (
		<div className={`${styles.container} ${withGap && styles.withGap} ${className}`}>
			{children}
		</div>
	);
}
