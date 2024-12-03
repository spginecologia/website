'use client';

/* * */

import type { Guideline, GuidelinesSelect } from '@/payload-types';

import Card from '@/components/common/Card';
import { CardSkeleton } from '@/components/common/CardSkeleton';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import { PayloadAPIResponse } from '@/types/payload-api-response';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function GuidelinesList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('guidelines.GuidelinesList');

	//
	// B. Fetch data

	const { data: allGuidelinesData, error: allGuidelinesError, isLoading: allGuidelinesLoading } = useSWR<PayloadAPIResponse<Guideline>>(`/api/guidelines`);

	console.log(allGuidelinesData);

	//
	// C. Render components

	if (allGuidelinesLoading) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<div className={styles.grid}>
						{[...Array(10)].map((_, i) => <CardSkeleton key={i} coverAspectRatio="210 / 297" />)}
					</div>
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	if (allGuidelinesError) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<ErrorDisplay />
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	if (!allGuidelinesData?.docs.length) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<NoDataDisplay />
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	return (
		<FrontendWrapperInner>
			<FrontendSection first>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{allGuidelinesData?.docs.map(guideline => (
						<Card
							key={guideline.id}
							coverAspectRatio="210 / 297"
							coverSrc={typeof guideline.featured_image === 'object' ? guideline?.featured_image?.url : undefined}
							href={`/guidelines/${guideline.id}`}
							publishDate={new Date(guideline.createdAt)}
							title={guideline.title}
						/>
					))}
				</div>
			</FrontendSection>
		</FrontendWrapperInner>
	);

	//
}
