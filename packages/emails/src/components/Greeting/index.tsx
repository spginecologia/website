/* * */

import { Text } from 'react-email';

import styles from './styles';

/* * */

export interface GreetingProps {
	text?: string
}

/* * */

export function Greeting({ text = 'Caros Sócios,' }: GreetingProps) {
	return (
		<Text style={styles.text}>
			{text}
		</Text>
	);
};
