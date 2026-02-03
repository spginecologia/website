'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { isRequiredFromZod } from '@/services/general/is-required-from-zod';
import { VideoDefault } from '@/services/payload/collections/Video/default';
import { VideoValidationClient } from '@/services/payload/collections/Video/validation';
import { type PayloadAPIResponse } from '@/types/payload-api-response';
import { Alert, Anchor, Button, Checkbox, Code, FileInput, Paper, Progress, Select, Space, TagsInput, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconX } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslation } from 'react-i18next';
import { type Section, type Topic } from 'payload-types';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

export function VideosSubmitForm() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation('videos.VideosSubmitForm');

	const [isError, setIsError] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [isDirty, setIsDirty] = useState(false);
	const [isValid, setIsValid] = useState(false);

	const [uploadProgress, setUploadProgress] = useState(0);

	//
	// B. Fetch data

	const { data: allTopicsData } = useSWR<PayloadAPIResponse<Topic>>('/api/topics');
	const { data: allSectionsData } = useSWR<PayloadAPIResponse<Section>>('/api/sections');

	//
	// C. Transform data

	const topicOptions = useMemo(() => {
		if (!allTopicsData?.docs) return [];
		return allTopicsData.docs.map(topic => ({ label: topic.title, value: topic.id }));
	}, [allTopicsData]);

	const sectionOptions = useMemo(() => {
		if (!allSectionsData?.docs) return [];
		return allSectionsData.docs.map(section => ({ label: section.title, value: section.id }));
	}, [allSectionsData]);

	//
	// D. Handle actions

	const handleValuesChange = () => {
		form.validate();
		setIsDirty(form.isDirty());
		setIsValid(form.isValid());
	};

	const handleSubmit = async (data) => {
		try {
			setIsLoading(true);
			setIsError(undefined);
			// Construct form data
			const formData = new FormData();
			formData.append('_json_data', JSON.stringify(data));
			formData.append('video_file', data.video_file);
			formData.append('declaration_file', data.declaration_file);
			formData.append('featured_image', data.featured_image);
			// Upload with progress tracking
			const xhr = new XMLHttpRequest();
			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					const percent = Math.round((event.loaded / event.total) * 100);
					setUploadProgress(percent);
				}
			};
			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					const resultData = JSON.parse(xhr.responseText);
					window.location.href = `/academia/videos/${resultData.id}`;
				}
				else {
					console.error('Upload failed', xhr.responseText);
					setIsError(xhr.responseText || 'XHR generic error. Response status: ' + xhr.status);
					setIsLoading(false);
				}
			};
			xhr.onerror = () => {
				console.error('Upload error');
				setIsLoading(false);
			};
			xhr.open('POST', '/api/account/videos/new');
			xhr.send(formData);
		}
		catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	//
	// E. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: VideoDefault,
		onValuesChange: handleValuesChange,
		validate: zod4Resolver(VideoValidationClient),
	});

	//
	// F. Render components

	return (
		<Paper>

			<Title order={2}>{t('title')}</Title>
			<Space h="xs" />
			<Text>{t('description')}</Text>
			<Space h="xs" />
			<Anchor href="/academia/videos/instructions" target="_blank">{t('instructions')}</Anchor>
			<Space h="xl" />

			<form onSubmit={form.onSubmit(handleSubmit)}>

				<FormSection>
					<TextInput label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} readOnly={isLoading} required={isRequiredFromZod(VideoValidationClient.shape.title)} {...form.getInputProps('title')} />
					<TextInput label={t('fields.authors.label')} placeholder={t('fields.authors.placeholder')} readOnly={isLoading} required={isRequiredFromZod(VideoValidationClient.shape.authors)} {...form.getInputProps('authors')} />
					<FileInput label={t('fields.video_file.label')} placeholder={t('fields.video_file.placeholder')} readOnly={isLoading} required={isRequiredFromZod(VideoValidationClient.shape.video_file)} {...form.getInputProps('video_file')} />
					<FileInput label={t('fields.featured_image.label')} placeholder={t('fields.featured_image.placeholder')} readOnly={isLoading} required={isRequiredFromZod(VideoValidationClient.shape.featured_image)} {...form.getInputProps('featured_image')} />
				</FormSection>

				<FormSection description={t('sections.about.description')} title={t('sections.about.title')}>
					<Textarea label={t('fields.introduction.label')} placeholder={t('fields.introduction.placeholder')} readOnly={isLoading} required={isRequiredFromZod(VideoValidationClient.shape.introduction)} {...form.getInputProps('introduction')} autosize />
					<Textarea label={t('fields.description.label')} placeholder={t('fields.description.placeholder')} readOnly={isLoading} required={isRequiredFromZod(VideoValidationClient.shape.description)} {...form.getInputProps('description')} autosize />
				</FormSection>

				<FormSection description={t('sections.metadata.description')} title={t('sections.metadata.title')}>
					<TagsInput data={topicOptions} label={t('fields.topics.label')} placeholder={t('fields.topics.placeholder')} readOnly={isLoading} required={isRequiredFromZod(VideoValidationClient.shape.topics)} {...form.getInputProps('topics')} />
					<Space h="md" />
					<Select data={sectionOptions} label={t('fields.section.label')} placeholder={t('fields.section.placeholder')} readOnly={isLoading} required={isRequiredFromZod(VideoValidationClient.shape.section)} {...form.getInputProps('section')} />
				</FormSection>

				<FormSection description={t('sections.privacy.description')} title={t('sections.privacy.title')}>
					<Anchor href="/files/academia-spg-declaracao-cedencia-direitos.pdf" target="_blank">{t('sections.privacy.rights_declaration_link')}</Anchor>
					<Space h="xl" />
					<FileInput label={t('fields.declaration_file.label')} placeholder={t('fields.declaration_file.placeholder')} readOnly={isLoading} required={isRequiredFromZod(VideoValidationClient.shape.declaration_file)} {...form.getInputProps('declaration_file')} />
					<Space h="md" />
					<Checkbox label={t('fields.rgpd_toggle.label')} required={isRequiredFromZod(VideoValidationClient.shape.rgpd_toggle)} {...form.getInputProps('rgpd_toggle', { type: 'checkbox' })} />
				</FormSection>

				{isDirty && <Button disabled={!isValid} loading={isLoading} type="submit">{t('actions.submit.label')}</Button>}

				{isLoading && (
					<>
						<Space h="md" />
						<Text variant="overline">{t('actions.uploading', { progress: uploadProgress })}</Text>
						<Space h="md" />
						<Progress value={uploadProgress} animated />
					</>
				)}

				{(isDirty && !isValid) && (
					<>
						<Space h={10} />
						<Text variant="overline">{t('actions.has_errors')}</Text>
					</>
				)}

				{isError && (
					<>
						<Space h={10} />
						<Alert icon={<IconX />} title={t('actions.upload_error.title')} w="100%">
							<Text size="sm">{t('actions.upload_error.message')}</Text>
							<Space h={5} />
							<Code block>{isError}</Code>
							<Space h={5} />
						</Alert>
					</>
				)}

			</form>
		</Paper>
	);
}
