'use client';

/* * */

import type { Section } from '@/payload-types';

import { Section as LayoutSection } from '@/components/common/Section';
import { SectionsSelectorItem } from '@/components/sections/SectionsSelectorItem';
import { PayloadAPIResponse } from '@/types/payload-api-response';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function SectionsSelector({ withTopSpacer = false }) {
	//

	//
	// A. Fetch data

	const { data: sectionsData } = useSWR<PayloadAPIResponse<Section>>('/api/sections');

	//
	// C. Render components

	return (
		<LayoutSection withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
			<div className={styles.grid}>
				{sectionsData?.docs?.map(sectionData => (
					<SectionsSelectorItem
						key={sectionData.id}
						imageSrc={typeof sectionData.featured_image === 'object' ? sectionData.featured_image?.url : ''}
						slug={sectionData.slug}
					/>
				))}
			</div>
		</LayoutSection>
	);

	//
}
