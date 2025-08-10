/* * */

import { AcademiaBanner } from '@/components/common/AcademiaBanner';

import styles from './styles.module.css';

/* * */

interface SectionProps {
	children: React.ReactNode
	title?: string
	withGap?: boolean
	withMaxWidth?: boolean
	withPadding?: boolean
	withTopSpacer?: 'academia' | 'none' | 'transparent'
}

/* * */

export function Section({ children, title = '', withGap, withMaxWidth, withPadding, withTopSpacer = 'none' }: SectionProps) {
	return (
		<>
			{withTopSpacer === 'academia' && <AcademiaBanner />}
			<div
				className={styles.container}
				data-with-gap={withGap}
				data-with-max-width={withMaxWidth}
				data-with-padding={withPadding}
				data-with-top-spacer={withTopSpacer}
			>
				<div className={styles.innerWrapper}>
					{title && <h1 className={styles.title}>{title}</h1>}
					{children}
				</div>
			</div>
		</>
	);
}
