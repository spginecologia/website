'use client';

/* * */

import generator from '@/services/generator';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	description?: string
	error?: string
	label: string
	name?: string
	placeholder?: string
	type?: string
}

/* * */

export default function TextField({ description, error, label, name, placeholder, type = 'text', ...props }: Props) {
	//

	//
	// A. Setup variables

	const [textFieldId, setTextFieldId] = useState(name || generator({ length: 3 }));

	//
	// B. Transform data

	//   useEffect(() => {
	//     setTextFieldId(name || generator(3));
	//   }, []);

	//
	// C. Render components

	return (
		<div className={`${styles.container} ${error && styles.isError}`}>
			<label className={styles.regularLabel}>{label}</label>
			<input className={styles.input} name={textFieldId} placeholder={placeholder} type={type} {...props} />
			{description && <label className={styles.descriptionLabel}>{description}</label>}
			{error && <label className={styles.errorLabel}>{error}</label>}
		</div>
	);

	//
}
