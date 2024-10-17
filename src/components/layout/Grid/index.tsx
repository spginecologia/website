/* * */

import classNames from 'classnames';

import styles from './styles.module.css';

/* * */

interface Props {
	align?: 'center' | 'end' | 'start'
	children?: React.ReactNode
	columns?: 'a' | 'aab' | 'ab' | 'abb' | 'abc' | 'abcd' | 'abcde'
	withGap?: boolean
}

/* * */

export function Grid({ align = 'start', children, columns = 'a', withGap }: Props) {
	return (
		<div className={classNames(styles.container, styles[columns], withGap && styles.withGap)} style={{ alignItems: align }}>
			{children}
		</div>
	);
}
