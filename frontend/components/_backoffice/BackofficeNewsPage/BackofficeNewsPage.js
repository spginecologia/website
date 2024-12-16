'use client';

/* * */

import { isAllowed } from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import BackofficeWrapperPage from '@/components/BackofficeWrapperPage/BackofficeWrapperPage';
import BackofficeWrapperPageSection from '@/components/BackofficeWrapperPageSection/BackofficeWrapperPageSection';
import Text from '@/components/Text/Text';
import { NewsDefault } from '@/schemas/News/default';
import { NewsFormProvider, useNewsForm } from '@/schemas/News/form';
import { NewsValidation } from '@/schemas/News/validation';
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

export default function BackofficeNewsPage() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const t = useTranslations('BackofficeNewsPage');
	const [isSaving, setIsSaving] = useState(false);
	const [hasErrorSaving, setHasErrorSaving] = useState();
	const [isDeleting, setIsDeleting] = useState(false);

	const { news_id } = useParams();

	const { data: session } = useSession();
	const isReadOnly = !isAllowed(session, 'news', 'create_edit');

	//
	// B. Fetch data

	const { mutate: allNewssMutate } = useSWR('/api/news');
	const { data: newsData, error: newsError, isLoading: newsLoading, isValidating: newsValidating, mutate: newsMutate } = useSWR(news_id && `/api/news/${news_id}`, { onSuccess: data => keepFormUpdated(data) });

	//
	// C. Setup form

	const newsForm = useNewsForm({
		clearInputErrorOnChange: true,
		initialValues: populate(NewsDefault, newsData),
		validate: yupResolver(NewsValidation),
		validateInputOnBlur: true,
		validateInputOnChange: true,
	});

	const keepFormUpdated = (data) => {
		if (!newsForm.isDirty()) {
			const populated = populate(NewsDefault, data);
			newsForm.setValues(populated);
			newsForm.resetDirty(populated);
		}
	};

	//
	// D. Handle actions

	const handleClose = async () => {
		router.push(`/admin/news/`);
	};

	const handleSave = async () => {
		try {
			setIsSaving(true);
			await API({ body: newsForm.values, method: 'PUT', operation: 'edit', resourceId: news_id, service: 'news' });
			newsMutate();
			allNewssMutate();
			newsForm.resetDirty();
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
					notify(news_id, 'loading', t('operations.delete.loading'));
					await API({ method: 'DELETE', operation: 'delete', resourceId: news_id, service: 'news' });
					allNewssMutate();
					router.push('/admin/news');
					notify(news_id, 'success', t('operations.delete.success'));
					setIsDeleting(false);
				}
				catch (err) {
					console.log(err);
					setIsDeleting(false);
					notify(news_id, 'error', err.message || t('operations.delete.error'));
				}
			},
			title: <Text text={t('operations.delete.title')} />,
		});
	};

	//
	// E. Render components

	return (
		<NewsFormProvider form={newsForm}>
			<form onSubmit={newsForm.onSubmit(async () => await handleSave())}>
				<BackofficeWrapperPage
					isDeleting={isDeleting}
					isDirty={newsForm.isDirty()}
					isErrorSaving={hasErrorSaving}
					isErrorValidating={newsError}
					isLoading={newsLoading}
					isSaving={isSaving}
					isValid={newsForm.isValid()}
					isValidating={newsValidating}
					onClose={handleClose}
					onDelete={handleDelete}
					onSave={handleSave}
					title={newsData?.title || t('untitled')}
				>
					<BackofficeWrapperPageSection subtitle={t('sections.default.subtitle')} title={t('sections.default.title')} defaultOpen>
						<SimpleGrid cols={1}>
							<TextInput label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...newsForm.getInputProps('title')} readOnly={isReadOnly} />
							<Textarea label={t('fields.description.label')} placeholder={t('fields.description.placeholder')} {...newsForm.getInputProps('description')} readOnly={isReadOnly} rows={4} />
						</SimpleGrid>
					</BackofficeWrapperPageSection>
				</BackofficeWrapperPage>
			</form>
		</NewsFormProvider>
	);
}
