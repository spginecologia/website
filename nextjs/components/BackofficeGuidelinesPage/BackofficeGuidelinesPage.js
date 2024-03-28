'use client';

/* * */

import useSWR from 'swr';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/translations/navigation';
import { GuidelineFormProvider, useGuidelineForm } from '@/schemas/Guideline/form';
import { yupResolver } from '@mantine/form';
import API from '@/services/API';
import { GuidelineDefault } from '@/schemas/Guideline/default';
import { GuidelineValidation } from '@/schemas/Guideline/validation';
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
  const { data: guidelineData, error: guidelineError, isLoading: guidelineLoading, isValidating: guidelineValidating, mutate: guidelineMutate } = useSWR(guideline_id && `/api/guidelines/${guideline_id}`, { onSuccess: (data) => keepFormUpdated(data) });

  //
  // C. Setup form

  const guidelineForm = useGuidelineForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validate: yupResolver(GuidelineValidation),
    initialValues: populate(GuidelineDefault, guidelineData),
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
      await API({ service: 'guidelines', resourceId: guideline_id, operation: 'edit', method: 'PUT', body: guidelineForm.values });
      guidelineMutate();
      allGuidelinesMutate();
      guidelineForm.resetDirty();
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
          notify(guideline_id, 'loading', t('operations.delete.loading'));
          await API({ service: 'guidelines', resourceId: guideline_id, operation: 'delete', method: 'DELETE' });
          allGuidelinesMutate();
          router.push('/admin/guidelines');
          notify(guideline_id, 'success', t('operations.delete.success'));
          setIsDeleting(false);
        } catch (err) {
          console.log(err);
          setIsDeleting(false);
          notify(guideline_id, 'error', err.message || t('operations.delete.error'));
        }
      },
    });
  };

  //
  // E. Render components

  return (
    <GuidelineFormProvider form={guidelineForm}>
      <form onSubmit={guidelineForm.onSubmit(async () => await handleSave())}>
        <BackofficeWrapperPage
          title={guidelineData?.title || t('untitled')}
          isDirty={guidelineForm.isDirty()}
          isValid={guidelineForm.isValid()}
          isLoading={guidelineLoading}
          isValidating={guidelineValidating}
          isErrorValidating={guidelineError}
          isSaving={isSaving}
          isErrorSaving={hasErrorSaving}
          isDeleting={isDeleting}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
        >
          <BackofficeWrapperPageSection title={t('sections.default.title')} subtitle={t('sections.default.subtitle')} defaultOpen>
            <SimpleGrid cols={1}>
              <TextInput label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...guidelineForm.getInputProps('title')} readOnly={isReadOnly} />
              <TextInput label={t('fields.subtitle.label')} placeholder={t('fields.subtitle.placeholder')} {...guidelineForm.getInputProps('subtitle')} readOnly={isReadOnly} />
              <TextInput label={t('fields.href.label')} placeholder={t('fields.href.placeholder')} {...guidelineForm.getInputProps('href')} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>
          <BackofficeWrapperPageSection title={t('sections.visibility.title')} subtitle={t('sections.visibility.subtitle')} defaultOpen>
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
