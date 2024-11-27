/* * */

import FrontendFooter from '@/components/FrontendFooter/FrontendFooter';
import { Header } from '@/components/header/Header';

import styles from './styles.module.css';

/* * */

export function WebsiteViewport({ children }) {
	return (
		<div className={styles.container}>
			<Header />
			{children}
			<FrontendFooter />
		</div>
	);
}
