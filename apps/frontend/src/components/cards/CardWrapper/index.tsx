/* * */

import Link from 'next/link';
import { type PropsWithChildren } from 'react';

import styles from './styles.module.css';

/* * */

interface CardWrapperProps {
	children: React.ReactNode
	className?: string
	fullHeight?: boolean
	href?: null | string
	target?: '_blank' | '_self'
	variant?: 'compact' | 'default' | 'featured'
}

/* * */

export function CardWrapper({ children, className, fullHeight, href, target = '_self', variant = 'default' }: PropsWithChildren<CardWrapperProps>) {
	//

	if (!href) {
		return (
			<div className={`${styles.wrapper} ${className ?? ''}`} data-full-height={fullHeight} data-variant={variant}>
				{children}
			</div>
		);
	}

	return (
		<Link className={`${styles.wrapper} ${className ?? ''}`} data-full-height={fullHeight} data-variant={variant} href={href} target={target} data-as-link>
			{children}
		</Link>
	);

	//
}
