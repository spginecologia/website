/* * */

import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
	className?: string
	href?: null | string
	target?: '_blank' | '_self'
	variant?: 'default' | 'featured'
}

/* * */

export function CardWrapper({ children = '', className, href, target = '_self', variant = 'default' }: Props) {
	//

	if (!href) {
		return (
			<div className={`${styles.wrapper} ${styles[variant]} ${className}`}>
				{children}
			</div>
		);
	}

	return (
		<Link className={`${styles.wrapper} ${styles[variant]} ${styles.asLink} ${className}`} href={href} target={target}>
			{children}
		</Link>
	);

	//
}
