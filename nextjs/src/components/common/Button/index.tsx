'use client';

import classNames from 'classnames';
import { HtmlHTMLAttributes } from 'react';

import styles from './styles.module.css';

interface Props extends HtmlHTMLAttributes<HTMLButtonElement> {
	disabled?: boolean
	fullWidth?: boolean
	link?: string
	onclick?: () => void
	type?: 'button' | 'reset' | 'submit'
	variant?: 'primary' | 'secondary'
}

export default function Button({
	children,
	className,
	disabled,
	fullWidth,
	link,
	onclick,
	type = 'button',
	variant = 'primary',
	...props
}: Props) {
	function handleClick() {
		if (link) {
			window.open(link, '_blank');
		}

		onclick?.();
	}

	return (
		<button
			onClick={handleClick}
			{...props}
			disabled={disabled}
			type={type}
			className={classNames(
				className,
				styles.button,
				styles[variant],
				fullWidth && styles.fullWidth,
			)}
		>
			{children}
		</button>
	);
}
