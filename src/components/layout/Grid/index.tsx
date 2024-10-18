/* * */

import classNames from 'classnames';

import styles from './styles.module.css';

/* * */

interface Props {
	align?: 'center' | 'end' | 'start'
	children?: React.ReactNode
	columns?: 'a' | 'aab' | 'ab' | 'abb' | 'abc' | 'abcd' | 'abcde'
	withGap?: boolean
	className?: string
}

/* * */

export function Grid({ align = 'start', children, columns = 'a', withGap, className }: Props) {
	return (
		<div className={classNames(styles.container, styles[columns], withGap && styles.withGap, className)} style={{ alignItems: align }}>
			{children}
		</div>
	);
}
