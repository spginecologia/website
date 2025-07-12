'use client';

/* * */

import type { Section } from '@/payload-types';

import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
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

	const { data: allSectionsData, error: allSectionsError, isLoading: allSectionsLoading } = useSWR<PayloadAPIResponse<Section>>('/api/sections');

	//
	// B. Render components

	if (allSectionsLoading) {
		return (
			<LayoutSection withPadding withTopSpacer={withTopSpacer ? 'transparent' : 'none'}>
				<div className={styles.grid}>
					{[...Array(5)].map((_, i) => <SectionsSelectorItem key={i} />)}
				</div>
			</LayoutSection>
		);
	}

	if (allSectionsError) {
		return (
			<LayoutSection withPadding withTopSpacer={withTopSpacer ? 'transparent' : 'none'}>
				<ErrorDisplay />
			</LayoutSection>
		);
	}

	if (!allSectionsData?.docs.length) {
		return (
			<LayoutSection withPadding withTopSpacer={withTopSpacer ? 'transparent' : 'none'}>
				<NoDataDisplay />
			</LayoutSection>
		);
	}

	return (
		<LayoutSection withPadding withTopSpacer={withTopSpacer ? 'transparent' : 'none'}>
			<div className={styles.grid}>
				{allSectionsData?.docs?.map(sectionData => (
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
