'use client';

/* * */

import { isAllowed } from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import BackofficeWrapperPage from '@/components/BackofficeWrapperPage/BackofficeWrapperPage';
import BackofficeWrapperPageSection from '@/components/BackofficeWrapperPageSection/BackofficeWrapperPageSection';
import Text from '@/components/Text/Text';
import { LinkDefault } from '@/schemas/Link/default';
import { LinkFormProvider, useLinkForm } from '@/schemas/Link/form';
import { LinkValidation } from '@/schemas/Link/validation';
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

export default function BackofficeLinksPage() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const t = useTranslations('BackofficeLinksPage');
	const [isSaving, setIsSaving] = useState(false);
	const [hasErrorSaving, setHasErrorSaving] = useState();
	const [isDeleting, setIsDeleting] = useState(false);

	const { link_id } = useParams();

	const { data: session } = useSession();
	const isReadOnly = !isAllowed(session, 'users', 'create_edit');

	//
	// B. Fetch data

	const { mutate: allLinksMutate } = useSWR('/api/links');
	const { data: linkData, error: linkError, isLoading: linkLoading, isValidating: linkValidating, mutate: linkMutate } = useSWR(link_id && `/api/links/${link_id}`, { onSuccess: data => keepFormUpdated(data) });

	//
	// C. Setup form

	const linkForm = useLinkForm({
		clearInputErrorOnChange: true,
		initialValues: populate(LinkDefault, linkData),
		validate: yupResolver(LinkValidation),
		validateInputOnBlur: true,
		validateInputOnChange: true,
	});

	const keepFormUpdated = (data) => {
		if (!linkForm.isDirty()) {
			const populated = populate(LinkDefault, data);
			linkForm.setValues(populated);
			linkForm.resetDirty(populated);
		}
	};

	//
	// D. Handle actions

	const handleClose = async () => {
		router.push(`/admin/links/`);
	};

	const handleSave = async () => {
		try {
			setIsSaving(true);
			await API({ body: linkForm.values, method: 'PUT', operation: 'edit', resourceId: link_id, service: 'links' });
			linkMutate();
			allLinksMutate();
			linkForm.resetDirty();
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
					notify(link_id, 'loading', t('operations.delete.loading'));
					await API({ method: 'DELETE', operation: 'delete', resourceId: link_id, service: 'links' });
					allLinksMutate();
					router.push('/admin/links');
					notify(link_id, 'success', t('operations.delete.success'));
					setIsDeleting(false);
				}
				catch (err) {
					console.log(err);
					setIsDeleting(false);
					notify(link_id, 'error', err.message || t('operations.delete.error'));
				}
			},
			title: <Text text={t('operations.delete.title')} />,
		});
	};

	//
	// E. Render components

	return (
		<LinkFormProvider form={linkForm}>
			<form onSubmit={linkForm.onSubmit(async () => await handleSave())}>
				<BackofficeWrapperPage
					isDeleting={isDeleting}
					isDirty={linkForm.isDirty()}
					isErrorSaving={hasErrorSaving}
					isErrorValidating={linkError}
					isLoading={linkLoading}
					isSaving={isSaving}
					isValid={linkForm.isValid()}
					isValidating={linkValidating}
					onClose={handleClose}
					onDelete={handleDelete}
					onSave={handleSave}
					title={linkData?.title || t('untitled')}
				>
					<BackofficeWrapperPageSection subtitle={t('sections.default.subtitle')} title={t('sections.default.title')} defaultOpen>
						<SimpleGrid cols={1}>
							<TextInput label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...linkForm.getInputProps('title')} readOnly={isReadOnly} />
							<TextInput label={t('fields.subtitle.label')} placeholder={t('fields.subtitle.placeholder')} {...linkForm.getInputProps('subtitle')} readOnly={isReadOnly} />
							<TextInput label={t('fields.href.label')} placeholder={t('fields.href.placeholder')} {...linkForm.getInputProps('href')} readOnly={isReadOnly} />
						</SimpleGrid>
					</BackofficeWrapperPageSection>
					<BackofficeWrapperPageSection subtitle={t('sections.visibility.subtitle')} title={t('sections.visibility.title')} defaultOpen>
						<SimpleGrid cols={1}>
							<NumberInput label={t('fields.sort_order.label')} placeholder={t('fields.sort_order.placeholder')} {...linkForm.getInputProps('sort_order')} readOnly={isReadOnly} />
						</SimpleGrid>
						<SimpleGrid cols={2} mt={20}>
							<Switch label={t('fields.is_active.label')} {...linkForm.getInputProps('is_active', { type: 'checkbox' })} readOnly={isReadOnly} size="lg" />
							<Switch label={t('fields.is_featured.label')} {...linkForm.getInputProps('is_featured', { type: 'checkbox' })} readOnly={isReadOnly} size="lg" />
						</SimpleGrid>
					</BackofficeWrapperPageSection>
				</BackofficeWrapperPage>
			</form>
		</LinkFormProvider>
	);
}
