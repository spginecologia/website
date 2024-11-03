/* * */

import classNames from 'classnames';

import styles from './styles.module.css';

/* * */

interface Props {
	align?: 'center' | 'end' | 'start'
	children?: React.ReactNode
	columns?: 'a' | 'aab' | 'ab' | 'abb' | 'abc' | 'abcd' | 'abcde'
	gap?: 'none' | 'sm' | 'md' | 'lg'
	className?: string
}

/* * */

export function Grid({ align = 'start', children, columns = 'a', gap = 'none', className }: Props) {
	return (
		<div className={classNames(styles.container, styles[columns], gap !== 'none' && styles[`gap-${gap}`], className)} style={{ alignItems: align }}>
			{children}
		</div>
	);
}
