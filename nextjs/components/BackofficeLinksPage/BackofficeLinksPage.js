'use client';

/* * */

import useSWR from 'swr';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/translations/navigation';
import { LinkFormProvider, useLinkForm } from '@/schemas/Link/form';
import { yupResolver } from '@mantine/form';
import API from '@/services/API';
import { LinkDefault } from '@/schemas/Link/default';
import { LinkValidation } from '@/schemas/Link/validation';
import { NumberInput, SimpleGrid, Switch, TextInput, Textarea } from '@mantine/core';
import Text from '@/components/Text/Text';
import notify from '@/services/notify';
import { openConfirmModal } from '@mantine/modals';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { isAllowed } from '@/components/AuthGate/AuthGate';
import populate from '@/services/populate';
import BackofficeWrapperPage from '@/components/BackofficeWrapperPage/BackofficeWrapperPage';
import BackofficeWrapperPageSection from '@/components/BackofficeWrapperPageSection/BackofficeWrapperPageSection';

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
  const { data: linkData, error: linkError, isLoading: linkLoading, isValidating: linkValidating, mutate: linkMutate } = useSWR(link_id && `/api/links/${link_id}`, { onSuccess: (data) => keepFormUpdated(data) });

  //
  // C. Setup form

  const linkForm = useLinkForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validate: yupResolver(LinkValidation),
    initialValues: populate(LinkDefault, linkData),
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
      await API({ service: 'links', resourceId: link_id, operation: 'edit', method: 'PUT', body: linkForm.values });
      linkMutate();
      allLinksMutate();
      linkForm.resetDirty();
      setIsSaving(false);
      setHasErrorSaving(false);
    } catch (err) {
      console.log(err);
      setIsSaving(false);
      setHasErrorSaving(err);
    }
  };

  const handleDelete = async () => {
    openConfirmModal({
      title: <Text text={t('operations.delete.title')} />,
      centered: true,
      closeOnClickOutside: true,
      children: <Text text={t('operations.delete.description')} />,
      labels: { confirm: t('operations.delete.confirm'), cancel: t('operations.delete.cancel') },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          setIsDeleting(true);
          notify(link_id, 'loading', t('operations.delete.loading'));
          await API({ service: 'links', resourceId: link_id, operation: 'delete', method: 'DELETE' });
          allLinksMutate();
          router.push('/admin/links');
          notify(link_id, 'success', t('operations.delete.success'));
          setIsDeleting(false);
        } catch (err) {
          console.log(err);
          setIsDeleting(false);
          notify(link_id, 'error', err.message || t('operations.delete.error'));
        }
      },
    });
  };

  //
  // E. Render components

  return (
    <LinkFormProvider form={linkForm}>
      <form onSubmit={linkForm.onSubmit(async () => await handleSave())}>
        <BackofficeWrapperPage
          title={linkData?.title || t('untitled')}
          isDirty={linkForm.isDirty()}
          isValid={linkForm.isValid()}
          isLoading={linkLoading}
          isValidating={linkValidating}
          isErrorValidating={linkError}
          isSaving={isSaving}
          isErrorSaving={hasErrorSaving}
          isDeleting={isDeleting}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
        >
          <BackofficeWrapperPageSection title={t('sections.default.title')} subtitle={t('sections.default.subtitle')} defaultOpen>
            <SimpleGrid cols={1}>
              <TextInput label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...linkForm.getInputProps('title')} readOnly={isReadOnly} />
              <TextInput label={t('fields.subtitle.label')} placeholder={t('fields.subtitle.placeholder')} {...linkForm.getInputProps('subtitle')} readOnly={isReadOnly} />
              <TextInput label={t('fields.href.label')} placeholder={t('fields.href.placeholder')} {...linkForm.getInputProps('href')} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>
          <BackofficeWrapperPageSection title={t('sections.visibility.title')} subtitle={t('sections.visibility.subtitle')} defaultOpen>
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
