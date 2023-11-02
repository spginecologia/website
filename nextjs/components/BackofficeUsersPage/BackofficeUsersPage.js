'use client';

/* * */

import useSWR from 'swr';
import { useState, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next-intl/client';
import { UserFormProvider, useUserForm } from '@/schemas/User/form';
import { yupResolver } from '@mantine/form';
import API from '@/services/API';
import { UserDefault } from '@/schemas/User/default';
import { UserValidation } from '@/schemas/User/validation';
import { SimpleGrid, TextInput, Divider, Switch, MultiSelect, Select } from '@mantine/core';
import Text from '@/components/Text/Text';
import notify from '@/services/notify';
import { openConfirmModal } from '@mantine/modals';
import UserActivityBadge from '@/components/UserActivityBadge/UserActivityBadge';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import AuthGate, { isAllowed } from '@/components/AuthGate/AuthGate';
import populate from '@/services/populate';
import BackofficeWrapperPage from '@/components/BackofficeWrapperPage/BackofficeWrapperPage';
import BackofficeWrapperPageSection from '@/components/BackofficeWrapperPageSection/BackofficeWrapperPageSection';
import { UserOptions } from '@/schemas/User/options';
import { DatePicker, DatePickerInput } from '@mantine/dates';

/* * */

export default function BackofficeUsersPage() {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const t = useTranslations('BackofficeUsersPage');
  const [isSaving, setIsSaving] = useState(false);
  const [hasErrorSaving, setHasErrorSaving] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  const { user_id } = useParams();

  const { data: session } = useSession();
  const isReadOnly = !isAllowed(session, 'users', 'create_edit');

  //
  // B. Fetch data

  const { mutate: allUsersMutate } = useSWR('/api/users');
  const { data: userData, error: userError, isLoading: userLoading, isValidating: userValidating, mutate: userMutate } = useSWR(user_id && `/api/users/${user_id}`, { onSuccess: (data) => keepFormUpdated(data) });

  //
  // C. Setup form

  const userForm = useUserForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validate: yupResolver(UserValidation),
    initialValues: populate(UserDefault, userData),
  });

  const keepFormUpdated = (data) => {
    if (!userForm.isDirty()) {
      const populated = populate(UserDefault, data);
      userForm.setValues(populated);
      userForm.resetDirty(populated);
    }
  };

  //
  // D. Handle actions

  const handleValidate = () => {
    userForm.validate();
  };

  const handleClose = async () => {
    router.push(`/admin/users/`);
  };

  const handleSave = useCallback(async () => {
    try {
      setIsSaving(true);
      await API({ service: 'users', resourceId: user_id, operation: 'edit', method: 'PUT', body: userForm.values });
      userMutate();
      allUsersMutate();
      userForm.resetDirty();
      setIsSaving(false);
      setHasErrorSaving(false);
    } catch (err) {
      console.log(err);
      setIsSaving(false);
      setHasErrorSaving(err);
    }
  }, [user_id, userForm, userMutate, allUsersMutate]);

  const handleDelete = async () => {
    openConfirmModal({
      title: <Text size="h2">{t('operations.delete.title')}</Text>,
      centered: true,
      closeOnClickOutside: true,
      children: <Text size="h3">{t('operations.delete.description')}</Text>,
      labels: { confirm: t('operations.delete.confirm'), cancel: t('operations.delete.cancel') },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          setIsDeleting(true);
          notify(user_id, 'loading', t('operations.delete.loading'));
          await API({ service: 'users', resourceId: user_id, operation: 'delete', method: 'DELETE' });
          allUsersMutate();
          router.push('/admin/users');
          notify(user_id, 'success', t('operations.delete.success'));
          setIsDeleting(false);
        } catch (err) {
          console.log(err);
          setIsDeleting(false);
          notify(user_id, 'error', err.message || t('operations.delete.error'));
        }
      },
    });
  };

  //
  // E. Render components

  return (
    <UserFormProvider form={userForm}>
      <form onSubmit={userForm.onSubmit(async () => await handleSave())}>
        <BackofficeWrapperPage
          title={`${userData?.title} ${userData?.first_name} ${userData?.last_name}`}
          isDirty={userForm.isDirty()}
          isValid={userForm.isValid()}
          isLoading={userLoading}
          isValidating={userValidating}
          isErrorValidating={userError}
          isSaving={isSaving}
          isErrorSaving={hasErrorSaving}
          isDeleting={isDeleting}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
        >
          <BackofficeWrapperPageSection title={t('sections.references.title')} subtitle={t('sections.references.subtitle')}>
            <SimpleGrid cols={3}>
              <Select label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} nothingFoundMessage={t('fields.title.nothingFound')} {...userForm.getInputProps('title')} data={UserOptions.title} searchable clearable />
              <TextInput label={t('fields.first_name.label')} placeholder={t('fields.first_name.placeholder')} {...userForm.getInputProps('first_name')} readOnly={isReadOnly} />
              <TextInput label={t('fields.last_name.label')} placeholder={t('fields.last_name.placeholder')} {...userForm.getInputProps('last_name')} readOnly={isReadOnly} />
            </SimpleGrid>
            <SimpleGrid cols={1}>
              <TextInput label={t('fields.full_name.label')} placeholder={t('fields.full_name.placeholder')} {...userForm.getInputProps('full_name')} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          <BackofficeWrapperPageSection>
            <SimpleGrid cols={3}>
              <TextInput label={t('fields.medical_id.label')} placeholder={t('fields.medical_id.placeholder')} {...userForm.getInputProps('medical_id')} readOnly={isReadOnly} />
              <TextInput label={t('fields.personal_tax_id.label')} placeholder={t('fields.personal_tax_id.placeholder')} {...userForm.getInputProps('personal_tax_id')} readOnly={isReadOnly} />
              <DatePickerInput label={t('fields.birthday.label')} placeholder={t('fields.birthday.placeholder')} {...userForm.getInputProps('birthday')} value={userForm.values.birthday ? new Date(userForm.values.birthday) : null} readOnly={isReadOnly} clearable />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          {/* <Section>
            <div>
              <Text size="h2">{t('sections.config.title')}</Text>
              <Text size="h4">{t('sections.config.description')}</Text>
              <UserActivityBadge last_active={userData?.last_active} />
            </div>
          </Section> */}

          <Divider />

          {/* <Section>
            <div>
              <Text size="h2">{t('form.permissions.agencies.title')}</Text>
              <Text size="h4">{t('form.permissions.agencies.description')}</Text>
            </div>
            <SimpleGrid cols={3} mt="md">
              <Switch
                size="md"
                label={t('form.permissions.agencies.create_edit.label')}
                description={t('form.permissions.agencies.create_edit.description')}
                {...userForm.getInputProps('permissions.agencies.create_edit', { type: 'checkbox' })}
                disabled={!userForm?.values?.permissions?.agencies?.view}
                readOnly={isReadOnly}
              />
            </SimpleGrid>
          </Section> */}

          {/*  */}
        </BackofficeWrapperPage>
      </form>
    </UserFormProvider>
  );
}
