/* * */

import styles from './styles.module.css';

/* * */

export default function Button({ fullwidth = false, label = 'Button Label', variant = 'default', ...props }) {
	switch (variant) {
		case 'default':
			return (
				<button className={`${styles.button} ${styles.default} ${fullwidth && styles.fullwidth}`} {...props}>
					{label}
				</button>
			);
		case 'muted':
			return (
				<button className={`${styles.button} ${styles.muted} ${fullwidth && styles.fullwidth}`} {...props}>
					{label}
				</button>
			);
		default:
	}
}
