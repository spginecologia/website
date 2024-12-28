/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
	className?: string
}
/* * */

export function ContentWrapper({ children, className = '' }: Props) {
	return (
		<div className={`${styles.container} ${className}`}>
			{children}
		</div>
	);
}
