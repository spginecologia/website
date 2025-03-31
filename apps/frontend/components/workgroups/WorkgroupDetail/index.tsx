'use client';

/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section as LayoutSection } from '@/components/common/Section';
import { WorkgroupDetailIntro } from '@/components/workgroups/WorkgroupDetailIntro';
import { type Workgroup } from '@/payload-types';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface Props {
	slug: string
}

/* * */

export function WorkgroupDetail({ slug }: Props) {
	//

	//
	// A. Fetch data

	const { data: workgroupData } = useSWR<Workgroup>(`/api/workgroups/${slug}`);

	console.log('workgroupData', workgroupData);

	//
	// B. Render components

	return (
		<ContentWrapper withGap={false}>
			<WorkgroupDetailIntro
				goalDescription={workgroupData?.goal_description}
				imageSrc={typeof workgroupData?.featured_image === 'object' ? workgroupData.featured_image?.url : null}
				introText={workgroupData?.intro_text}
				projectDescription={workgroupData?.project_description}
			/>
			<LayoutSection>
				<div className={styles.contentWrapper}>
					content
				</div>
			</LayoutSection>
		</ContentWrapper>
	);

	//
}
