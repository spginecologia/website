'use client';

/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section } from '@/components/common/Section';
import { Anchor, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

/* * */

export function VideosInstructions() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<ContentWrapper>

			<Section withTopSpacer="academia" withGap withMaxWidth>
				<Title order={2}>{t('videos.VideosInstructions.title')}</Title>
				<Text>{t('videos.VideosInstructions.subtitle')}</Text>
			</Section>

			<Section withGap withMaxWidth>
				<Title order={3}>{t('videos.VideosInstructions.sections.video_title.title')}</Title>
				<Text size="sm">{t('videos.VideosInstructions.sections.video_title.paragraph_1')}</Text>
			</Section>

			<Section withGap withMaxWidth>
				<Title order={3}>{t('videos.VideosInstructions.sections.authors.title')}</Title>
				<Text size="sm">{t('videos.VideosInstructions.sections.authors.paragraph_1')}</Text>
			</Section>

			<Section withGap withMaxWidth>
				<Title order={3}>{t('videos.VideosInstructions.sections.video_file.title')}</Title>
				<Text size="sm">{t('videos.VideosInstructions.sections.video_file.paragraph_1')}</Text>
				<Text size="sm">{t('videos.VideosInstructions.sections.video_file.paragraph_2')}</Text>
			</Section>

			<Section withGap withMaxWidth>
				<Title order={3}>{t('videos.VideosInstructions.sections.cover_image.title')}</Title>
				<Text size="sm">{t('videos.VideosInstructions.sections.cover_image.paragraph_1')}</Text>
				<Text size="sm">{t('videos.VideosInstructions.sections.cover_image.paragraph_2')}</Text>
			</Section>

			<Section withGap withMaxWidth>
				<Title order={3}>{t('videos.VideosInstructions.sections.introduction.title')}</Title>
				<Text size="sm">{t('videos.VideosInstructions.sections.introduction.paragraph_1')}</Text>
				<Text size="sm">{t('videos.VideosInstructions.sections.introduction.paragraph_2')}</Text>
			</Section>

			<Section withGap withMaxWidth>
				<Title order={3}>{t('videos.VideosInstructions.sections.description.title')}</Title>
				<Text size="sm">{t('videos.VideosInstructions.sections.description.paragraph_1')}</Text>
				<Text size="sm">{t('videos.VideosInstructions.sections.description.paragraph_2')}</Text>
			</Section>

			<Section withGap withMaxWidth>
				<Title order={3}>{t('videos.VideosInstructions.sections.topics.title')}</Title>
				<Text size="sm">{t('videos.VideosInstructions.sections.topics.paragraph_1')}</Text>
				<Text size="sm">{t('videos.VideosInstructions.sections.topics.paragraph_2')}</Text>
			</Section>

			<Section withGap withMaxWidth>
				<Title order={3}>{t('videos.VideosInstructions.sections.spg_sections.title')}</Title>
				<Text size="sm">{t('videos.VideosInstructions.sections.spg_sections.paragraph_1')}</Text>
			</Section>

			<Section withGap withMaxWidth>
				<Title order={3}>{t('videos.VideosInstructions.sections.rights_declaration.title')}</Title>
				<Text size="sm">{t('videos.VideosInstructions.sections.rights_declaration.paragraph_1')}</Text>
				<Anchor href="/files/academia-spg-declaracao-cedencia-direitos.pdf" target="_blank">{t('videos.VideosInstructions.sections.rights_declaration.link_1')}</Anchor>
			</Section>

			<Section withGap withMaxWidth>
				<Title order={3}>{t('videos.VideosInstructions.sections.rgpd_declaration.title')}</Title>
				<Text size="sm">{t('videos.VideosInstructions.sections.rgpd_declaration.paragraph_1')}</Text>
				<Anchor href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02016R0679-20160504" target="_blank">{t('videos.VideosInstructions.sections.rgpd_declaration.link_1')}</Anchor>
			</Section>

		</ContentWrapper>
	);

	//
}
