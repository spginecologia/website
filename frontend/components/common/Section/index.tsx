/* * */

import { AcademiaBanner } from '../AcademiaBanner';
import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
	title?: string
	topSpacerType?: 'academia' | 'none' | 'transparent'
}

/* * */

export function Section({ children, title = '', topSpacerType = 'none' }: Props) {
	return (
		<>
			{topSpacerType === 'academia' && <AcademiaBanner />}
			<div className={`${styles.container} ${topSpacerType === 'transparent' && styles.withTopSpacer}`}>
				<div className={styles.innerWrapper}>
					{title && <h1 className={styles.title}>{title}</h1>}
					{children}
				</div>
			</div>
		</>
	);
}
