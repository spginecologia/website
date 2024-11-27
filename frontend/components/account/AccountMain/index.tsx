/* * */

import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';

import styles from './styles.module.css';

/* * */

export function AccountMain({ children }) {
	return (
		<div className={styles.container}>
			<FrontendWrapperInner>
				<FrontendSection first>
					<div className={styles.grid}>{children}</div>
				</FrontendSection>
			</FrontendWrapperInner>
		</div>
	);
}
