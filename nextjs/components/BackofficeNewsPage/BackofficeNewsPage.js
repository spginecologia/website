'use client';

/* * */

import useSWR from 'swr';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/translations/navigation';
import { NewsFormProvider, useNewsForm } from '@/schemas/News/form';
import { yupResolver } from '@mantine/form';
import API from '@/services/API';
import { NewsDefault } from '@/schemas/News/default';
import { NewsValidation } from '@/schemas/News/validation';
import { SimpleGrid, TextInput, Textarea } from '@mantine/core';
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
  const { data: newsData, error: newsError, isLoading: newsLoading, isValidating: newsValidating, mutate: newsMutate } = useSWR(news_id && `/api/news/${news_id}`, { onSuccess: (data) => keepFormUpdated(data) });

  //
  // C. Setup form

  const newsForm = useNewsForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validate: yupResolver(NewsValidation),
    initialValues: populate(NewsDefault, newsData),
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
      await API({ service: 'news', resourceId: news_id, operation: 'edit', method: 'PUT', body: newsForm.values });
      newsMutate();
      allNewssMutate();
      newsForm.resetDirty();
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
          notify(news_id, 'loading', t('operations.delete.loading'));
          await API({ service: 'news', resourceId: news_id, operation: 'delete', method: 'DELETE' });
          allNewssMutate();
          router.push('/admin/news');
          notify(news_id, 'success', t('operations.delete.success'));
          setIsDeleting(false);
        } catch (err) {
          console.log(err);
          setIsDeleting(false);
          notify(news_id, 'error', err.message || t('operations.delete.error'));
        }
      },
    });
  };

  //
  // E. Render components

  return (
    <NewsFormProvider form={newsForm}>
      <form onSubmit={newsForm.onSubmit(async () => await handleSave())}>
        <BackofficeWrapperPage
          title={newsData?.title || t('untitled')}
          isDirty={newsForm.isDirty()}
          isValid={newsForm.isValid()}
          isLoading={newsLoading}
          isValidating={newsValidating}
          isErrorValidating={newsError}
          isSaving={isSaving}
          isErrorSaving={hasErrorSaving}
          isDeleting={isDeleting}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
        >
          <BackofficeWrapperPageSection title={t('sections.default.title')} subtitle={t('sections.default.subtitle')} defaultOpen>
            <SimpleGrid cols={1}>
              <TextInput label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...newsForm.getInputProps('title')} readOnly={isReadOnly} />
              <Textarea label={t('fields.description.label')} placeholder={t('fields.description.placeholder')} {...newsForm.getInputProps('description')} rows={4} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>
        </BackofficeWrapperPage>
      </form>
    </NewsFormProvider>
  );
}
