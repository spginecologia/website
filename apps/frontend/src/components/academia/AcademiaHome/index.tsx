'use client';

/* * */

import { AcademiaHomeCourses } from '@/components/academia/AcademiaHomeCourses';
import { AcademiaHomeGuidelines } from '@/components/academia/AcademiaHomeGuidelines';
import { AcademiaHomeIntro } from '@/components/academia/AcademiaHomeIntro';
import { AcademiaHomeNav } from '@/components/academia/AcademiaHomeNav';
import { AcademiaHomePublications } from '@/components/academia/AcademiaHomePublications';
import { AcademiaHomeVideos } from '@/components/academia/AcademiaHomeVideos';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Space } from '@mantine/core';

/* * */

export function AcademiaHome() {
	return (
		<ContentWrapper withGap>
			<AcademiaHomeIntro />
			<AcademiaHomeNav />
			<Space />
			<AcademiaHomeGuidelines />
			<Space />
			<AcademiaHomeVideos />
			<Space />
			<AcademiaHomePublications />
			<Space />
			<AcademiaHomeCourses />
		</ContentWrapper>
	);
}
