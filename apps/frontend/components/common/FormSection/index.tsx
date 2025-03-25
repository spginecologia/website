/* * */

import { Text, Title } from '@mantine/core';

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
					<Title order={4}>{title}</Title>
					{description && <Text size="xs">{description}</Text>}
				</div>
			)}
			<div className={styles.children}>{children}</div>
		</div>
	);
}
