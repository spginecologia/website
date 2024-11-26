/* * */

import FrontendFooter from '@/components/FrontendFooter/FrontendFooter';
import FrontendHeader from '@/components/FrontendHeader/FrontendHeader';

import styles from './styles.module.css';

/* * */

export function WebsiteViewport({ children }) {
	return (
		<div className={styles.container}>
			<FrontendHeader />
			{children}
			<FrontendFooter />
		</div>
	);
}
