'use client';

/* * */

import { isAllowed } from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import BackofficeWrapperPage from '@/components/BackofficeWrapperPage/BackofficeWrapperPage';
import BackofficeWrapperPageSection from '@/components/BackofficeWrapperPageSection/BackofficeWrapperPageSection';
import Text from '@/components/Text/Text';
import { GuidelineDefault } from '@/schemas/Guideline/default';
import { GuidelineFormProvider, useGuidelineForm } from '@/schemas/Guideline/form';
import { GuidelineValidation } from '@/schemas/Guideline/validation';
import API from '@/services/API';
import notify from '@/services/notify';
import populate from '@/services/populate';
import { NumberInput, SimpleGrid, Switch, Textarea, TextInput } from '@mantine/core';
import { yupResolver } from '@mantine/form';
import { openConfirmModal } from '@mantine/modals';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useSWR from 'swr';

/* * */

export default function BackofficeGuidelinesPage() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const t = useTranslations('BackofficeGuidelinesPage');
	const [isSaving, setIsSaving] = useState(false);
	const [hasErrorSaving, setHasErrorSaving] = useState();
	const [isDeleting, setIsDeleting] = useState(false);

	const { guideline_id } = useParams();

	const { data: session } = useSession();
	const isReadOnly = !isAllowed(session, 'guidelines', 'create_edit');

	//
	// B. Fetch data

	const { mutate: allGuidelinesMutate } = useSWR('/api/guidelines/all');
	const { data: guidelineData, error: guidelineError, isLoading: guidelineLoading, isValidating: guidelineValidating, mutate: guidelineMutate } = useSWR(guideline_id && `/api/guidelines/${guideline_id}`, { onSuccess: data => keepFormUpdated(data) });

	//
	// C. Setup form

	const guidelineForm = useGuidelineForm({
		clearInputErrorOnChange: true,
		initialValues: populate(GuidelineDefault, guidelineData),
		validate: yupResolver(GuidelineValidation),
		validateInputOnBlur: true,
		validateInputOnChange: true,
	});

	const keepFormUpdated = (data) => {
		if (!guidelineForm.isDirty()) {
			const populated = populate(GuidelineDefault, data);
			guidelineForm.setValues(populated);
			guidelineForm.resetDirty(populated);
		}
	};

	//
	// D. Handle actions

	const handleClose = async () => {
		router.push(`/admin/guidelines/`);
	};

	const handleSave = async () => {
		try {
			setIsSaving(true);
			await API({ body: guidelineForm.values, method: 'PUT', operation: 'edit', resourceId: guideline_id, service: 'guidelines' });
			guidelineMutate();
			allGuidelinesMutate();
			guidelineForm.resetDirty();
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
					notify(guideline_id, 'loading', t('operations.delete.loading'));
					await API({ method: 'DELETE', operation: 'delete', resourceId: guideline_id, service: 'guidelines' });
					allGuidelinesMutate();
					router.push('/admin/guidelines');
					notify(guideline_id, 'success', t('operations.delete.success'));
					setIsDeleting(false);
				}
				catch (err) {
					console.log(err);
					setIsDeleting(false);
					notify(guideline_id, 'error', err.message || t('operations.delete.error'));
				}
			},
			title: <Text text={t('operations.delete.title')} />,
		});
	};

	//
	// E. Render components

	return (
		<GuidelineFormProvider form={guidelineForm}>
			<form onSubmit={guidelineForm.onSubmit(async () => await handleSave())}>
				<BackofficeWrapperPage
					isDeleting={isDeleting}
					isDirty={guidelineForm.isDirty()}
					isErrorSaving={hasErrorSaving}
					isErrorValidating={guidelineError}
					isLoading={guidelineLoading}
					isSaving={isSaving}
					isValid={guidelineForm.isValid()}
					isValidating={guidelineValidating}
					onClose={handleClose}
					onDelete={handleDelete}
					onSave={handleSave}
					title={guidelineData?.title || t('untitled')}
				>
					<BackofficeWrapperPageSection subtitle={t('sections.default.subtitle')} title={t('sections.default.title')} defaultOpen>
						<SimpleGrid cols={1}>
							<TextInput label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...guidelineForm.getInputProps('title')} readOnly={isReadOnly} />
							<TextInput label={t('fields.subtitle.label')} placeholder={t('fields.subtitle.placeholder')} {...guidelineForm.getInputProps('subtitle')} readOnly={isReadOnly} />
							<TextInput label={t('fields.href.label')} placeholder={t('fields.href.placeholder')} {...guidelineForm.getInputProps('href')} readOnly={isReadOnly} />
						</SimpleGrid>
					</BackofficeWrapperPageSection>
					<BackofficeWrapperPageSection subtitle={t('sections.visibility.subtitle')} title={t('sections.visibility.title')} defaultOpen>
						<SimpleGrid cols={1}>
							<NumberInput label={t('fields.sort_order.label')} placeholder={t('fields.sort_order.placeholder')} {...guidelineForm.getInputProps('sort_order')} readOnly={isReadOnly} />
						</SimpleGrid>
						<SimpleGrid cols={2} mt={20}>
							<Switch label={t('fields.is_active.label')} {...guidelineForm.getInputProps('is_active', { type: 'checkbox' })} readOnly={isReadOnly} size="lg" />
							<Switch label={t('fields.is_featured.label')} {...guidelineForm.getInputProps('is_featured', { type: 'checkbox' })} readOnly={isReadOnly} size="lg" />
						</SimpleGrid>
					</BackofficeWrapperPageSection>
				</BackofficeWrapperPage>
			</form>
		</GuidelineFormProvider>
	);
}
