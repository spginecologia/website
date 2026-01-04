'use client';

/* * */

import { AuthWall } from '@/components/auth/AuthWall';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section } from '@/components/common/Section';
import { VideosSubmitForm } from '@/components/videos/VideosSubmitForm';

import styles from './styles.module.css';

/* * */

export function VideosSubmit() {
	return (
		<ContentWrapper variant="support">
			<Section withTopSpacer="transparent">
				<AuthWall>
					<div className={styles.grid}>
						<div />
						<VideosSubmitForm />
					</div>
				</AuthWall>
			</Section>
		</ContentWrapper>
	);
}
