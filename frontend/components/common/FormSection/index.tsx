/* * */

import Text from '../../Text/Text';
import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
	description?: string
	title?: string
}

/* * */

export function FormSection({ children, description, title }: Props) {
	return (
		<div className={styles.container}>
			{title && (
				<div className={styles.formHeader}>
					<Text text={title} variant="form_section_title" />
					{description && <Text text={description} variant="form_section_description" />}
				</div>
			)}
			<div className={styles.children}>{children}</div>
		</div>
	);
}
