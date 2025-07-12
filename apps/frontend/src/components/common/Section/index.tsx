/* * */

import { AcademiaBanner } from '@/components/common/AcademiaBanner';

import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
	title?: string
	withPadding?: boolean
	withTopSpacer?: 'academia' | 'none' | 'transparent'
}

/* * */

export function Section({ children, title = '', withPadding, withTopSpacer = 'none' }: Props) {
	return (
		<>
			{withTopSpacer === 'academia' && <AcademiaBanner />}
			<div className={`${styles.container} ${withTopSpacer === 'transparent' && styles.withTopSpacer} ${withPadding && styles.withPadding}`}>
				<div className={styles.innerWrapper}>
					{title && <h1 className={styles.title}>{title}</h1>}
					{children}
				</div>
			</div>
		</>
	);
}
