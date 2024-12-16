'use client';

/* * */

import { isAllowed } from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import BackofficeWrapperPage from '@/components/BackofficeWrapperPage/BackofficeWrapperPage';
import BackofficeWrapperPageSection from '@/components/BackofficeWrapperPageSection/BackofficeWrapperPageSection';
import Text from '@/components/Text/Text';
import { TopicDefault } from '@/schemas/Topic/default';
import { TopicFormProvider, useTopicForm } from '@/schemas/Topic/form';
import { TopicValidation } from '@/schemas/Topic/validation';
import API from '@/services/API';
import notify from '@/services/notify';
import populate from '@/services/populate';
import { SimpleGrid, Textarea, TextInput } from '@mantine/core';
import { yupResolver } from '@mantine/form';
import { openConfirmModal } from '@mantine/modals';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useSWR from 'swr';

/* * */

export default function BackofficeTopicsPage() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const t = useTranslations('BackofficeTopicsPage');
	const [isSaving, setIsSaving] = useState(false);
	const [hasErrorSaving, setHasErrorSaving] = useState();
	const [isDeleting, setIsDeleting] = useState(false);

	const { topic_id } = useParams();

	const { data: session } = useSession();
	const isReadOnly = !isAllowed(session, 'topics', 'create_edit');

	//
	// B. Fetch data

	const { mutate: allTopicsMutate } = useSWR('/api/topics');
	const { data: topicData, error: topicError, isLoading: topicLoading, isValidating: topicValidating, mutate: topicMutate } = useSWR(topic_id && `/api/topics/${topic_id}`, { onSuccess: data => keepFormUpdated(data) });

	//
	// C. Setup form

	const topicForm = useTopicForm({
		clearInputErrorOnChange: true,
		initialValues: populate(TopicDefault, topicData),
		validate: yupResolver(TopicValidation),
		validateInputOnBlur: true,
		validateInputOnChange: true,
	});

	const keepFormUpdated = (data) => {
		if (!topicForm.isDirty()) {
			const populated = populate(TopicDefault, data);
			topicForm.setValues(populated);
			topicForm.resetDirty(populated);
		}
	};

	//
	// D. Handle actions

	const handleClose = async () => {
		router.push(`/admin/topics/`);
	};

	const handleSave = async () => {
		try {
			setIsSaving(true);
			await API({ body: topicForm.values, method: 'PUT', operation: 'edit', resourceId: topic_id, service: 'topics' });
			topicMutate();
			allTopicsMutate();
			topicForm.resetDirty();
			setIsSaving(false);
			setHasErrorSaving(false);
		}
		catch (err) {
			console.log(err);
			setIsSaving(false);
			setHasErrorSaving(err);
		}
	};

	const handleDelete = async () => {
		openConfirmModal({
			centered: true,
			children: <Text text={t('operations.delete.description')} />,
			closeOnClickOutside: true,
			confirmProps: { color: 'red' },
			labels: { cancel: t('operations.delete.cancel'), confirm: t('operations.delete.confirm') },
			onConfirm: async () => {
				try {
					setIsDeleting(true);
					notify(topic_id, 'loading', t('operations.delete.loading'));
					await API({ method: 'DELETE', operation: 'delete', resourceId: topic_id, service: 'topics' });
					allTopicsMutate();
					router.push('/admin/topics');
					notify(topic_id, 'success', t('operations.delete.success'));
					setIsDeleting(false);
				}
				catch (err) {
					console.log(err);
					setIsDeleting(false);
					notify(topic_id, 'error', err.message || t('operations.delete.error'));
				}
			},
			title: <Text text={t('operations.delete.title')} />,
		});
	};

	//
	// E. Render components

	return (
		<TopicFormProvider form={topicForm}>
			<form onSubmit={topicForm.onSubmit(async () => await handleSave())}>
				<BackofficeWrapperPage
					isDeleting={isDeleting}
					isDirty={topicForm.isDirty()}
					isErrorSaving={hasErrorSaving}
					isErrorValidating={topicError}
					isLoading={topicLoading}
					isSaving={isSaving}
					isValid={topicForm.isValid()}
					isValidating={topicValidating}
					onClose={handleClose}
					onDelete={handleDelete}
					onSave={handleSave}
					title={topicData?.title || t('untitled')}
				>
					<BackofficeWrapperPageSection subtitle={t('sections.default.subtitle')} title={t('sections.default.title')} defaultOpen>
						<SimpleGrid cols={1}>
							<TextInput label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...topicForm.getInputProps('title')} readOnly={isReadOnly} />
							<Textarea label={t('fields.description.label')} placeholder={t('fields.description.placeholder')} {...topicForm.getInputProps('description')} readOnly={isReadOnly} rows={4} />
						</SimpleGrid>
					</BackofficeWrapperPageSection>
				</BackofficeWrapperPage>
			</form>
		</TopicFormProvider>
	);
}
