'use client';

/* * */

import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import { VideosSubmitForm } from '@/components/videos/VideosSubmitForm';

import styles from './styles.module.css';

/* * */

export function VideosSubmit() {
	//

	return (
		<div className={styles.container}>
			<FrontendWrapperInner>
				<FrontendSection first>
					<div className={styles.grid}>
						<div />
						<VideosSubmitForm />
					</div>
				</FrontendSection>
			</FrontendWrapperInner>
		</div>
	);

	//
}
