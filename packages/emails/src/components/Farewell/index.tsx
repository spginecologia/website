/* * */

import { Text } from '@react-email/components';

import styles from './styles';

/* * */

export interface FarewellProps {
	text?: 'Academia SPG' | 'Secretariado SPG'
}

/* * */

export function Farewell({ text = 'Academia SPG' }: FarewellProps) {
	return (
		<Text style={styles.text}>
			{text}
		</Text>
	);
};

/* * */

export default Farewell;
