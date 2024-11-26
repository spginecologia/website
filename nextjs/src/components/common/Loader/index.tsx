/* * */

import styles from './Loader.module.css';

/* * */

interface Props {
	fixed?: boolean
	full?: boolean
	size?: number
	visible?: boolean
}

/* * */

export function Loader({ fixed, full, size = 30, visible = false }: Props) {
	//

	if (!visible) return <div />;

	// Setup spinner
	const Spinner = () => <div className={styles.spinner} style={{ borderWidth: size / 7, height: size, width: size }} />;

	// If
	if (full) {
		return (
			<div className={styles.full}>
				<Spinner />
			</div>
		);
	}

	// If
	if (fixed) {
		return (
			<div className={styles.fixed}>
				<Spinner />
			</div>
		);
	}

	return <Spinner />;

	//
}
