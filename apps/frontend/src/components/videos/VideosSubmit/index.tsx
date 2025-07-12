'use client';

/* * */

import { ContentWrapper } from '@/src/components/common/ContentWrapper';
import { Section } from '@/src/components/common/Section';
import { VideosSubmitForm } from '@/src/components/videos/VideosSubmitForm';

import styles from './styles.module.css';

/* * */

export function VideosSubmit() {
	return (
		<ContentWrapper variant="support">
			<Section withTopSpacer="transparent">
				<div className={styles.grid}>
					<div />
					<VideosSubmitForm />
				</div>
			</Section>
		</ContentWrapper>
	);
}
