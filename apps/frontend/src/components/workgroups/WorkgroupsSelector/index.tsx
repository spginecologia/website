'use client';

/* * */

import type { Workgroup } from 'payload-types';

import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { Section as LayoutSection } from '@/components/common/Section';
import { WorkgroupsSelectorItem } from '@/components/workgroups/WorkgroupsSelectorItem';
import { PayloadAPIResponse } from '@/types/payload-api-response';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function WorkgroupsSelector({ withTopSpacer = false }) {
	//

	//
	// A. Fetch data

	const { data: allSectionsData, error: allSectionsError, isLoading: allSectionsLoading } = useSWR<PayloadAPIResponse<Workgroup>>('/api/workgroups');

	//
	// B. Render components

	if (allSectionsLoading) {
		return (
			<LayoutSection withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
				<div className={styles.grid}>
					{[...Array(5)].map((_, i) => <WorkgroupsSelectorItem key={i} />)}
				</div>
			</LayoutSection>
		);
	}

	if (allSectionsError) {
		return (
			<LayoutSection withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
				<ErrorDisplay />
			</LayoutSection>
		);
	}

	if (!allSectionsData?.docs.length) {
		return (
			<LayoutSection withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
				<NoDataDisplay />
			</LayoutSection>
		);
	}

	return (
		<LayoutSection withTopSpacer={withTopSpacer ? 'transparent' : 'none'} withPadding>
			<div className={styles.grid}>
				{allSectionsData?.docs?.map(workgroupData => (
					<WorkgroupsSelectorItem
						key={workgroupData.id}
						imageSrc={typeof workgroupData.featured_image === 'object' ? workgroupData.featured_image?.url : ''}
						slug={workgroupData.slug}
					/>
				))}
			</div>
		</LayoutSection>
	);

	//
}
