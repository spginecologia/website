/* * */

import { type PropsWithChildren } from 'react';
import { Text } from 'react-email';

import styles from './styles';

/* * */

export function Paragraph({ children }: PropsWithChildren) {
	return (
		<Text style={styles.text}>
			{children}
		</Text>
	);
};
