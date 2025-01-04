'use client';

/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section as LayoutSection } from '@/components/common/Section';
import { SectionDetailIntro } from '@/components/sections/SectionDetailIntro';
import { Section } from '@/payload-types';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface Props {
	slug: string
}

/* * */

export function SectionDetail({ slug }: Props) {
	//

	//
	// A. Fetch data

	const { data: sectionData } = useSWR<Section>(`/api/sections/${slug}`);

	console.log('sectionData', sectionData);

	//
	// B. Render components

	return (
		<ContentWrapper withGap={false}>
			<SectionDetailIntro
				goalDescription={sectionData?.goal_description}
				imageSrc={typeof sectionData?.featured_image === 'object' ? sectionData.featured_image?.url : null}
				introText={sectionData?.intro_text}
				projectDescription={sectionData?.project_description}
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
