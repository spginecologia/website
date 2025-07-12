/* * */

import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
	className?: string
	fullHeight?: boolean
	href?: null | string
	target?: '_blank' | '_self'
	variant?: 'compact' | 'default' | 'featured'
}

/* * */

export function CardWrapper({ children = '', className, fullHeight, href, target = '_self', variant = 'default' }: Props) {
	//

	if (!href) {
		return (
			<div className={`${styles.wrapper} ${fullHeight && styles.fullHeight} ${styles[variant]} ${className}`}>
				{children}
			</div>
		);
	}

	return (
		<Link className={`${styles.wrapper} ${fullHeight && styles.fullHeight} ${styles.asLink} ${styles[variant]} ${className}`} href={href} target={target}>
			{children}
		</Link>
	);

	//
}
