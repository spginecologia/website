'use client';

/* * */

import { Videos } from '@/collections/Videos';
import { FormSection } from '@/components/common/FormSection';
import { VideoDefault } from '@/schemas/Video/default';
import { VideoValidation } from '@/schemas/Video/validation';
import { Button, Checkbox, FileInput, MultiSelect, Paper, Select, Space, Text, Textarea, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

/* * */

export function VideosSubmitForm() {
	//

	//
	// A. Setup variables

	const t = useTranslations('videos.VideosSubmitForm');

	const [isLoading, setIsLoading] = useState(false);
	const [isDirty, setIsDirty] = useState(false);
	const [isValid, setIsValid] = useState(false);

	//
	// C. Transform data

	const titleOptions = useMemo(() => {
		const field = Videos.fields.find(field => field['name'] === 'title');
		if (!field) return [];
		return field['options'];
	}, [Videos.fields]);

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
			await fetch('/api/account/profile/edit', {
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			form.reset();
			setIsLoading(false);
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
		// mode: 'uncontrolled',
		onValuesChange: handleValuesChange,
		validate: zodResolver(VideoValidation),
	});

	//
	// F. Render components

	return (
		<Paper>

			<Title order={2}>{t('title')}</Title>
			<Text>{t('description')}</Text>

			<form onSubmit={form.onSubmit(handleSubmit)}>

				<FormSection>
					<TextInput label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} readOnly={isLoading} {...form.getInputProps('title')} />
					<TextInput label={t('fields.authors.label')} placeholder={t('fields.authors.placeholder')} readOnly={isLoading} {...form.getInputProps('authors')} />
					<FileInput label={t('fields.video_file.label')} placeholder={t('fields.video_file.placeholder')} readOnly={isLoading} {...form.getInputProps('video_file')} />
					<FileInput label={t('fields.cover_file.label')} placeholder={t('fields.cover_file.placeholder')} readOnly={isLoading} {...form.getInputProps('cover_file')} />
				</FormSection>

				<FormSection description={t('sections.about.description')} title={t('sections.about.title')}>
					<Textarea label={t('fields.introduction.label')} placeholder={t('fields.introduction.placeholder')} readOnly={isLoading} {...form.getInputProps('introduction')} />
					<Textarea label={t('fields.description.label')} placeholder={t('fields.description.placeholder')} readOnly={isLoading} {...form.getInputProps('description')} />
				</FormSection>

				<FormSection description={t('sections.metadata.description')} title={t('sections.metadata.title')}>
					<MultiSelect label={t('fields.topics.label')} placeholder={t('fields.topics.placeholder')} readOnly={isLoading} {...form.getInputProps('topics')} />
					<Select label={t('fields.section.label')} placeholder={t('fields.section.placeholder')} readOnly={isLoading} {...form.getInputProps('section')} />
				</FormSection>

				<FormSection description={t('sections.privacy.description')} title={t('sections.privacy.title')}>
					<FileInput label={t('fields.declaration_file.label')} placeholder={t('fields.declaration_file.placeholder')} readOnly={isLoading} {...form.getInputProps('declaration_file')} />
					<Checkbox label={t('fields.rgpd_toggle.label')} {...form.getInputProps('rgpd_toggle', { type: 'checkbox' })} />
				</FormSection>

				{isDirty && <Button disabled={!isValid} loading={isLoading} type="submit">{t('actions.submit.label')}</Button>}

				{(isDirty && !isValid) && (
					<>
						<Space h={10} />
						<Text variant="overline">{t('actions.has_errors')}</Text>
					</>
				)}

			</form>
		</Paper>
	);
}
