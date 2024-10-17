'use client';
import classNames from 'classnames';

import styles from './styles.module.css';
import { HtmlHTMLAttributes } from 'react';

interface Props extends HtmlHTMLAttributes<HTMLButtonElement> {
	fullWidth?: boolean
	link?: string
	onclick?: () => void
	type?: 'button' | 'reset' | 'submit'
	variant?: 'primary' | 'secondary'
}

export default function Button({ children, className, fullWidth, link, onclick, type = 'button', variant = 'primary', ...props }: Props) {
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
			className={classNames(className, styles.button, styles[variant], fullWidth && styles.fullWidth)}
			type={type}
		>
			{children}
		</button>
	);
}
