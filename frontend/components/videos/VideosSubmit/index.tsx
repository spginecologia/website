'use client';

/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section } from '@/components/common/Section';
import { VideosSubmitForm } from '@/components/videos/VideosSubmitForm';

import styles from './styles.module.css';

/* * */

export function VideosSubmit() {
	return (
		<ContentWrapper className={styles.contentWrapperOverride}>
			<Section topSpacerType="transparent">
				<div className={styles.grid}>
					<div />
					<VideosSubmitForm />
				</div>
			</Section>
		</ContentWrapper>
	);
}
