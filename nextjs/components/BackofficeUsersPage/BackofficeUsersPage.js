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
import { SimpleGrid, TextInput, Divider, Switch, MultiSelect, Select, Textarea } from '@mantine/core';
import Text from '@/components/Text/Text';
import notify from '@/services/notify';
import { openConfirmModal } from '@mantine/modals';
import UserActivityBadge from '@/components/UserActivityBadge/UserActivityBadge';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import AuthGate, { isAllowed } from '@/components/AuthGate/AuthGate';
import populate from '@/services/populate';
import BackofficeWrapperPage from '@/components/BackofficeWrapperPage/BackofficeWrapperPage';
import BackofficeWrapperPageSection from '@/components/BackofficeWrapperPageSection/BackofficeWrapperPageSection';
import { UserOptions } from '@/schemas/User/options';
import { DatePicker, DatePickerInput, DateTimePicker } from '@mantine/dates';

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

  const relativeTimeFormatter = useFormatter();
  const nowForRelativeTime = useNow({ updateInterval: 1000 });

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
          <BackofficeWrapperPageSection title={t('sections.status.title')} subtitle={t('sections.status.subtitle')}>
            <SimpleGrid cols={3}>
              <DateTimePicker
                label={t('fields.last_active.label')}
                placeholder={t('fields.last_active.placeholder')}
                description={userForm.values.last_active ? t('fields.last_active.was_active', { value: relativeTimeFormatter.relativeTime(new Date(userForm.values.last_active), nowForRelativeTime) }) : t('fields.last_active.was_never_active')}
                {...userForm.getInputProps('last_active')}
                value={userForm.values.last_active ? new Date(userForm.values.last_active) : null}
                valueFormat="ddd, D [de] MMMM [de] YYYY [às] hh:mm"
                readOnly={isReadOnly}
                clearable
              />
              <DatePickerInput
                label={t('fields.membership_date.label')}
                placeholder={t('fields.membership_date.placeholder')}
                description={t('fields.membership_date.description')}
                {...userForm.getInputProps('membership_date')}
                value={userForm.values.membership_date ? new Date(userForm.values.membership_date) : null}
                valueFormat="ddd, D [de] MMMM [de] YYYY"
                readOnly={isReadOnly}
                clearable
              />
              <DatePickerInput
                label={t('fields.registration_date.label')}
                placeholder={t('fields.registration_date.placeholder')}
                description={t('fields.registration_date.description')}
                {...userForm.getInputProps('registration_date')}
                value={userForm.values.registration_date ? new Date(userForm.values.registration_date) : null}
                valueFormat="ddd, D [de] MMMM [de] YYYY"
                readOnly
                disabled
              />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          <Divider />

          <BackofficeWrapperPageSection title={t('sections.references.title')} subtitle={t('sections.references.subtitle')}>
            <SimpleGrid cols={3}>
              <Select label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} nothingFoundMessage={t('fields.title.nothingFound')} {...userForm.getInputProps('title')} data={UserOptions.title} searchable clearable />
              <TextInput label={t('fields.first_name.label')} placeholder={t('fields.first_name.placeholder')} {...userForm.getInputProps('first_name')} readOnly={isReadOnly} />
              <TextInput label={t('fields.last_name.label')} placeholder={t('fields.last_name.placeholder')} {...userForm.getInputProps('last_name')} readOnly={isReadOnly} />
            </SimpleGrid>
            <SimpleGrid cols={1}>
              <TextInput label={t('fields.full_name.label')} placeholder={t('fields.full_name.placeholder')} {...userForm.getInputProps('full_name')} readOnly={isReadOnly} />
            </SimpleGrid>
            <SimpleGrid cols={3}>
              <TextInput label={t('fields.medical_id.label')} placeholder={t('fields.medical_id.placeholder')} {...userForm.getInputProps('medical_id')} readOnly={isReadOnly} />
              <TextInput label={t('fields.personal_tax_id.label')} placeholder={t('fields.personal_tax_id.placeholder')} {...userForm.getInputProps('personal_tax_id')} readOnly={isReadOnly} />
              <DatePickerInput
                label={t('fields.birthday.label')}
                placeholder={t('fields.birthday.placeholder')}
                {...userForm.getInputProps('birthday')}
                value={userForm.values.birthday ? new Date(userForm.values.birthday) : null}
                valueFormat="ddd, D [de] MMMM [de] YYYY"
                readOnly={isReadOnly}
                clearable
              />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          <Divider />

          <BackofficeWrapperPageSection title={t('sections.contacts.title')} subtitle={t('sections.contacts.subtitle')}>
            <SimpleGrid cols={2}>
              <TextInput type="email" label={t('fields.email.label')} placeholder={t('fields.email.placeholder')} {...userForm.getInputProps('email')} readOnly={isReadOnly} />
              <TextInput type="tel" label={t('fields.phone.label')} placeholder={t('fields.phone.placeholder')} {...userForm.getInputProps('phone')} readOnly={isReadOnly} />
            </SimpleGrid>
            <SimpleGrid cols={2}>
              <TextInput label={t('fields.personal_address_1.label')} placeholder={t('fields.personal_address_1.placeholder')} {...userForm.getInputProps('personal_address_1')} readOnly={isReadOnly} />
              <TextInput label={t('fields.personal_address_2.label')} placeholder={t('fields.personal_address_2.placeholder')} {...userForm.getInputProps('personal_address_2')} readOnly={isReadOnly} />
            </SimpleGrid>
            <SimpleGrid cols={3}>
              <TextInput label={t('fields.personal_postal_code.label')} placeholder={t('fields.personal_postal_code.placeholder')} {...userForm.getInputProps('personal_postal_code')} readOnly={isReadOnly} />
              <TextInput label={t('fields.personal_city.label')} placeholder={t('fields.personal_city.placeholder')} {...userForm.getInputProps('personal_city')} readOnly={isReadOnly} />
              <TextInput label={t('fields.personal_country.label')} placeholder={t('fields.personal_country.placeholder')} {...userForm.getInputProps('personal_country')} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          <Divider />

          <BackofficeWrapperPageSection title={t('sections.activity_interests.title')} subtitle={t('sections.activity_interests.subtitle')}>
            <SimpleGrid cols={2}>
              <TextInput label={t('fields.primary_workplace.label')} placeholder={t('fields.primary_workplace.placeholder')} {...userForm.getInputProps('primary_workplace')} readOnly={isReadOnly} />
              <TextInput label={t('fields.secondary_workplace.label')} placeholder={t('fields.secondary_workplace.placeholder')} {...userForm.getInputProps('secondary_workplace')} readOnly={isReadOnly} />
            </SimpleGrid>
            <SimpleGrid cols={2}>
              <MultiSelect label={t('fields.favorite_sections.label')} placeholder={t('fields.favorite_sections.placeholder')} nothingFoundMessage={t('fields.favorite_sections.nothingFound')} {...userForm.getInputProps('favorite_sections')} data={UserOptions.title} searchable clearable />
              <MultiSelect label={t('fields.favorite_topics.label')} placeholder={t('fields.favorite_topics.placeholder')} nothingFoundMessage={t('fields.favorite_topics.nothingFound')} {...userForm.getInputProps('favorite_topics')} data={UserOptions.title} searchable clearable />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          <Divider />

          <BackofficeWrapperPageSection title={t('sections.billing.title')} subtitle={t('sections.billing.subtitle')}>
            <SimpleGrid cols={2}>
              <TextInput label={t('fields.billing_name.label')} placeholder={t('fields.billing_name.placeholder')} {...userForm.getInputProps('billing_name')} readOnly={isReadOnly} />
              <TextInput label={t('fields.billing_tax_id.label')} placeholder={t('fields.billing_tax_id.placeholder')} {...userForm.getInputProps('billing_tax_id')} readOnly={isReadOnly} />
            </SimpleGrid>
            <SimpleGrid cols={2}>
              <TextInput label={t('fields.billing_address_1.label')} placeholder={t('fields.billing_address_1.placeholder')} {...userForm.getInputProps('billing_address_1')} readOnly={isReadOnly} />
              <TextInput label={t('fields.billing_address_2.label')} placeholder={t('fields.billing_address_2.placeholder')} {...userForm.getInputProps('billing_address_2')} readOnly={isReadOnly} />
            </SimpleGrid>
            <SimpleGrid cols={3}>
              <TextInput label={t('fields.billing_postal_code.label')} placeholder={t('fields.billing_postal_code.placeholder')} {...userForm.getInputProps('billing_postal_code')} readOnly={isReadOnly} />
              <TextInput label={t('fields.billing_city.label')} placeholder={t('fields.billing_city.placeholder')} {...userForm.getInputProps('billing_city')} readOnly={isReadOnly} />
              <TextInput label={t('fields.billing_country.label')} placeholder={t('fields.billing_country.placeholder')} {...userForm.getInputProps('billing_country')} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          <Divider />

          <BackofficeWrapperPageSection title={t('sections.communications.title')} subtitle={t('sections.communications.subtitle')}>
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.send_mandatory_communications.label')} description={t('fields.send_mandatory_communications.description')} checked disabled />
              <Switch size="md" label={t('fields.send_notifications.label')} description={t('fields.send_notifications.description')} {...userForm.getInputProps('send_notifications', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.send_newsletter.label')} description={t('fields.send_newsletter.description')} {...userForm.getInputProps('send_newsletter', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          <Divider />

          <BackofficeWrapperPageSection title={t('sections.observations.title')} subtitle={t('sections.observations.subtitle')}>
            <SimpleGrid cols={1}>
              <Textarea label={t('fields.admin_observations.label')} placeholder={t('fields.admin_observations.placeholder')} {...userForm.getInputProps('admin_observations')} rows={8} readOnly={isReadOnly} />
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
