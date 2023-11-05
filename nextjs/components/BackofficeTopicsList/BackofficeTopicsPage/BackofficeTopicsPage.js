'use client';

/* * */

import useSWR from 'swr';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next-intl/client';
import { TopicFormProvider, useTopicForm } from '@/schemas/Topic/form';
import { yupResolver } from '@mantine/form';
import API from '@/services/API';
import { TopicDefault } from '@/schemas/Topic/default';
import { TopicValidation } from '@/schemas/Topic/validation';
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
  const { data: topicData, error: topicError, isLoading: topicLoading, isValidating: topicValidating, mutate: topicMutate } = useSWR(topic_id && `/api/topics/${topic_id}`, { onSuccess: (data) => keepFormUpdated(data) });

  //
  // C. Setup form

  const topicForm = useTopicForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validate: yupResolver(TopicValidation),
    initialValues: populate(TopicDefault, topicData),
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
      await API({ service: 'topics', resourceId: topic_id, operation: 'edit', method: 'PUT', body: topicForm.values });
      topicMutate();
      allTopicsMutate();
      topicForm.resetDirty();
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
          notify(topic_id, 'loading', t('operations.delete.loading'));
          await API({ service: 'topics', resourceId: topic_id, operation: 'delete', method: 'DELETE' });
          allTopicsMutate();
          router.push('/admin/topics');
          notify(topic_id, 'success', t('operations.delete.success'));
          setIsDeleting(false);
        } catch (err) {
          console.log(err);
          setIsDeleting(false);
          notify(topic_id, 'error', err.message || t('operations.delete.error'));
        }
      },
    });
  };

  //
  // E. Render components

  return (
    <TopicFormProvider form={topicForm}>
      <form onSubmit={topicForm.onSubmit(async () => await handleSave())}>
        <BackofficeWrapperPage
          title={topicData?.title || t('untitled')}
          isDirty={topicForm.isDirty()}
          isValid={topicForm.isValid()}
          isLoading={topicLoading}
          isValidating={topicValidating}
          isErrorValidating={topicError}
          isSaving={isSaving}
          isErrorSaving={hasErrorSaving}
          isDeleting={isDeleting}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
        >
          <BackofficeWrapperPageSection title={t('sections.default.title')} subtitle={t('sections.default.subtitle')} defaultOpen>
            <SimpleGrid cols={1}>
              <TextInput label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...topicForm.getInputProps('title')} readOnly={isReadOnly} />
              <Textarea label={t('fields.description.label')} placeholder={t('fields.description.placeholder')} {...topicForm.getInputProps('description')} rows={4} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>
        </BackofficeWrapperPage>
      </form>
    </TopicFormProvider>
  );
}
