/* * */

import { Footer } from '@/src/components/footer/Footer';
import { Header } from '@/src/components/header/Header';

import styles from './styles.module.css';

/* * */

export function WebsiteViewport({ children }) {
	return (
		<div className={styles.container}>
			<Header />
			{children}
			<Footer />
		</div>
	);
}
