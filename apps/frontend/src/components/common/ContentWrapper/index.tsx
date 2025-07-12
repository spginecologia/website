/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
	variant?: 'brand-primary' | 'brand-secondary' | 'default' | 'support'
	withGap?: boolean
}
/* * */

export function ContentWrapper({ children, variant = 'default', withGap = true }: Props) {
	return (
		<div className={styles.container} data-variant={variant} data-with-gap={withGap}>
			{children}
		</div>
	);
}
