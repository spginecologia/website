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
import { SimpleGrid, TextInput, Divider, Switch, MultiSelect, Select, Textarea, Group, Button } from '@mantine/core';
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

  const handleSave = async () => {
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

  const handleSetPresetPermissions = (preset) => {
    switch (preset) {
      case 'candidate':
        userForm.setValues({
          permissions: {
            admin: { backoffice: false, debug: false },
            news: { create_edit: false, delete: false },
            agenda: { create_edit: false, delete: false },
            videos: { view: false, upload: false, create_edit_own: false, approve: false, create_edit_all: false, delete: false },
            guidelines: { create_edit: false, delete: false },
            publications: { view: false, create_edit: false, delete: false },
            courses: { view: false, create_edit: false, delete: false },
            topics: { create_edit: false, delete: false },
            testimonials: { create_edit: false, delete: false },
            tributes: { create_edit: false, delete: false },
            users: { view: false, create_edit: false, permissions: false, approve: false, charge_money: false, delete: false },
          },
        });
        return;
      case 'member':
        userForm.setValues({
          permissions: {
            admin: { backoffice: false, debug: false },
            news: { create_edit: false, delete: false },
            agenda: { create_edit: false, delete: false },
            videos: { view: true, upload: true, create_edit_own: true, approve: false, create_edit_all: false, delete: false },
            guidelines: { create_edit: false, delete: false },
            publications: { view: true, create_edit: false, delete: false },
            courses: { view: true, create_edit: false, delete: false },
            topics: { create_edit: false, delete: false },
            testimonials: { create_edit: false, delete: false },
            tributes: { create_edit: false, delete: false },
            users: { view: false, create_edit: false, permissions: false, approve: false, charge_money: false, delete: false },
          },
        });
        return;
      case 'reviewer':
        userForm.setValues({
          permissions: {
            admin: { backoffice: true, debug: false },
            news: { create_edit: false, delete: false },
            agenda: { create_edit: false, delete: false },
            videos: { view: true, upload: true, create_edit_own: true, approve: true, create_edit_all: true, delete: false },
            guidelines: { create_edit: false, delete: false },
            publications: { view: true, create_edit: false, delete: false },
            courses: { view: true, create_edit: false, delete: false },
            topics: { create_edit: false, delete: false },
            testimonials: { create_edit: false, delete: false },
            tributes: { create_edit: false, delete: false },
            users: { view: false, create_edit: false, permissions: false, approve: false, charge_money: false, delete: false },
          },
        });
        return;
      case 'publisher':
        userForm.setValues({
          permissions: {
            admin: { backoffice: true, debug: false },
            news: { create_edit: true, delete: true },
            agenda: { create_edit: true, delete: true },
            videos: { view: true, upload: true, create_edit_own: true, approve: false, create_edit_all: false, delete: false },
            guidelines: { create_edit: true, delete: true },
            publications: { view: true, create_edit: true, delete: true },
            courses: { view: true, create_edit: true, delete: true },
            topics: { create_edit: true, delete: true },
            testimonials: { create_edit: true, delete: true },
            tributes: { create_edit: true, delete: true },
            users: { view: false, create_edit: false, permissions: false, approve: false, charge_money: false, delete: false },
          },
        });
        return;
      case 'secretary':
        userForm.setValues({
          permissions: {
            admin: { backoffice: true, debug: false },
            news: { create_edit: false, delete: false },
            agenda: { create_edit: false, delete: false },
            videos: { view: false, upload: false, create_edit_own: false, approve: false, create_edit_all: false, delete: false },
            guidelines: { create_edit: false, delete: false },
            publications: { view: false, create_edit: false, delete: false },
            courses: { view: false, create_edit: false, delete: false },
            topics: { create_edit: false, delete: false },
            testimonials: { create_edit: false, delete: false },
            tributes: { create_edit: false, delete: false },
            users: { view: true, create_edit: true, permissions: true, approve: true, charge_money: false, delete: false },
          },
        });
        return;
      case 'accountant':
        userForm.setValues({
          permissions: {
            admin: { backoffice: true, debug: false },
            news: { create_edit: false, delete: false },
            agenda: { create_edit: false, delete: false },
            videos: { view: false, upload: false, create_edit_own: false, approve: false, create_edit_all: false, delete: false },
            guidelines: { create_edit: false, delete: false },
            publications: { view: false, create_edit: false, delete: false },
            courses: { view: false, create_edit: false, delete: false },
            topics: { create_edit: false, delete: false },
            testimonials: { create_edit: false, delete: false },
            tributes: { create_edit: false, delete: false },
            users: { view: true, create_edit: true, approve: false, charge_money: true, delete: false },
          },
        });
        return;
      case 'admin':
        userForm.setValues({
          permissions: {
            admin: { backoffice: true, debug: false },
            news: { create_edit: true, delete: true },
            agenda: { create_edit: true, delete: true },
            videos: { view: true, upload: true, create_edit_own: true, approve: true, create_edit_all: true, delete: true },
            guidelines: { create_edit: true, delete: true },
            publications: { view: true, create_edit: true, delete: true },
            courses: { view: true, create_edit: true, delete: true },
            topics: { create_edit: true, delete: true },
            testimonials: { create_edit: true, delete: true },
            tributes: { create_edit: true, delete: true },
            users: { view: true, create_edit: true, approve: true, charge_money: true, delete: true },
          },
        });
        return;
    }
  };

  //
  // E. Render components

  return (
    <UserFormProvider form={userForm}>
      <form onSubmit={userForm.onSubmit(async () => await handleSave())}>
        <BackofficeWrapperPage
          title={userData?.display_name || t('untitled')}
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
          <BackofficeWrapperPageSection title={t('sections.status.title')} subtitle={t('sections.status.subtitle')} defaultOpen>
            <SimpleGrid cols={3}>
              <DateTimePicker
                label={t('fields.last_active.label')}
                placeholder={t('fields.last_active.placeholder')}
                description={userForm.values.last_active ? t('fields.last_active.was_active', { value: relativeTimeFormatter.relativeTime(new Date(userForm.values.last_active), nowForRelativeTime) }) : t('fields.last_active.was_never_active')}
                {...userForm.getInputProps('last_active')}
                value={userForm.values.last_active ? new Date(userForm.values.last_active) : null}
                valueFormat="ddd, D [de] MMMM [de] YYYY [às] hh:mm"
                readOnly
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

          <BackofficeWrapperPageSection title={t('sections.communications.title')} subtitle={t('sections.communications.subtitle')}>
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.send_mandatory_communications.label')} description={t('fields.send_mandatory_communications.description')} checked disabled />
              <Switch size="md" label={t('fields.send_notifications.label')} description={t('fields.send_notifications.description')} {...userForm.getInputProps('send_notifications', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.send_newsletter.label')} description={t('fields.send_newsletter.description')} {...userForm.getInputProps('send_newsletter', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          <BackofficeWrapperPageSection title={t('sections.observations.title')} subtitle={t('sections.observations.subtitle')}>
            <SimpleGrid cols={1}>
              <Textarea label={t('fields.admin_observations.label')} placeholder={t('fields.admin_observations.placeholder')} {...userForm.getInputProps('admin_observations')} rows={8} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          <BackofficeWrapperPageSection title={t('sections.permissions.title')} subtitle={t('sections.permissions.subtitle')}>
            <SimpleGrid cols={4}>
              <Button variant="default" color="gray" onClick={() => handleSetPresetPermissions('candidate')}>
                {t('sections.permissions.presets.candidate.label')}
              </Button>
              <Button variant="default" color="gray" onClick={() => handleSetPresetPermissions('member')}>
                {t('sections.permissions.presets.member.label')}
              </Button>
              <Button variant="default" color="gray" onClick={() => handleSetPresetPermissions('reviewer')}>
                {t('sections.permissions.presets.reviewer.label')}
              </Button>
              <Button variant="default" color="gray" onClick={() => handleSetPresetPermissions('publisher')}>
                {t('sections.permissions.presets.publisher.label')}
              </Button>
              <Button variant="default" color="gray" onClick={() => handleSetPresetPermissions('accountant')}>
                {t('sections.permissions.presets.accountant.label')}
              </Button>
              <Button variant="default" color="gray" onClick={() => handleSetPresetPermissions('secretary')}>
                {t('sections.permissions.presets.secretary.label')}
              </Button>
              <Button variant="default" color="gray" onClick={() => handleSetPresetPermissions('admin')}>
                {t('sections.permissions.presets.admin.label')}
              </Button>
            </SimpleGrid>

            <Divider label={t('fields.permissions.admin.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.admin.backoffice.label')} description={t('fields.permissions.admin.backoffice.description')} {...userForm.getInputProps('permissions.admin.backoffice', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.admin.debug.label')} description={t('fields.permissions.admin.debug.description')} {...userForm.getInputProps('permissions.admin.debug', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>

            <Divider label={t('fields.permissions.news.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.news.create_edit.label')} description={t('fields.permissions.news.create_edit.description')} {...userForm.getInputProps('permissions.news.create_edit', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.news.delete.label')} description={t('fields.permissions.news.delete.description')} {...userForm.getInputProps('permissions.news.delete', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>

            <Divider label={t('fields.permissions.agenda.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.agenda.create_edit.label')} description={t('fields.permissions.agenda.create_edit.description')} {...userForm.getInputProps('permissions.agenda.create_edit', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.agenda.delete.label')} description={t('fields.permissions.agenda.delete.description')} {...userForm.getInputProps('permissions.agenda.delete', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>

            <Divider label={t('fields.permissions.videos.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.videos.view.label')} description={t('fields.permissions.videos.view.description')} {...userForm.getInputProps('permissions.videos.view', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.videos.upload.label')} description={t('fields.permissions.videos.upload.description')} {...userForm.getInputProps('permissions.videos.upload', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.videos.create_edit_own.label')} description={t('fields.permissions.videos.create_edit_own.description')} {...userForm.getInputProps('permissions.videos.create_edit_own', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.videos.approve.label')} description={t('fields.permissions.videos.approve.description')} {...userForm.getInputProps('permissions.videos.approve', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.videos.create_edit_all.label')} description={t('fields.permissions.videos.create_edit_all.description')} {...userForm.getInputProps('permissions.videos.create_edit_all', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.videos.delete.label')} description={t('fields.permissions.videos.delete.description')} {...userForm.getInputProps('permissions.videos.delete', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>

            <Divider label={t('fields.permissions.guidelines.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.guidelines.create_edit.label')} description={t('fields.permissions.guidelines.create_edit.description')} {...userForm.getInputProps('permissions.guidelines.create_edit', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.guidelines.delete.label')} description={t('fields.permissions.guidelines.delete.description')} {...userForm.getInputProps('permissions.guidelines.delete', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>

            <Divider label={t('fields.permissions.publications.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.publications.create_edit.label')} description={t('fields.permissions.publications.create_edit.description')} {...userForm.getInputProps('permissions.publications.create_edit', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.publications.delete.label')} description={t('fields.permissions.publications.delete.description')} {...userForm.getInputProps('permissions.publications.delete', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>

            <Divider label={t('fields.permissions.courses.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.courses.create_edit.label')} description={t('fields.permissions.courses.create_edit.description')} {...userForm.getInputProps('permissions.courses.create_edit', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.courses.delete.label')} description={t('fields.permissions.courses.delete.description')} {...userForm.getInputProps('permissions.courses.delete', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>

            <Divider label={t('fields.permissions.topics.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.topics.create_edit.label')} description={t('fields.permissions.topics.create_edit.description')} {...userForm.getInputProps('permissions.topics.create_edit', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.topics.delete.label')} description={t('fields.permissions.topics.delete.description')} {...userForm.getInputProps('permissions.topics.delete', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>

            <Divider label={t('fields.permissions.testimonials.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.testimonials.create_edit.label')} description={t('fields.permissions.testimonials.create_edit.description')} {...userForm.getInputProps('permissions.testimonials.create_edit', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.testimonials.delete.label')} description={t('fields.permissions.testimonials.delete.description')} {...userForm.getInputProps('permissions.testimonials.delete', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>

            <Divider label={t('fields.permissions.tributes.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.tributes.create_edit.label')} description={t('fields.permissions.tributes.create_edit.description')} {...userForm.getInputProps('permissions.tributes.create_edit', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.tributes.delete.label')} description={t('fields.permissions.tributes.delete.description')} {...userForm.getInputProps('permissions.tributes.delete', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>

            <Divider label={t('fields.permissions.users.divider.label')} labelPosition="left" mt={20} />
            <SimpleGrid cols={3}>
              <Switch size="md" label={t('fields.permissions.users.view.label')} description={t('fields.permissions.users.view.description')} {...userForm.getInputProps('permissions.users.view', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.users.create_edit.label')} description={t('fields.permissions.users.create_edit.description')} {...userForm.getInputProps('permissions.users.create_edit', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.users.permissions.label')} description={t('fields.permissions.users.permissions.description')} {...userForm.getInputProps('permissions.users.permissions', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.users.approve.label')} description={t('fields.permissions.users.approve.description')} {...userForm.getInputProps('permissions.users.approve', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.users.charge_money.label')} description={t('fields.permissions.users.charge_money.description')} {...userForm.getInputProps('permissions.users.charge_money', { type: 'checkbox' })} readOnly={isReadOnly} />
              <Switch size="md" label={t('fields.permissions.users.delete.label')} description={t('fields.permissions.users.delete.description')} {...userForm.getInputProps('permissions.users.delete', { type: 'checkbox' })} readOnly={isReadOnly} />
            </SimpleGrid>
          </BackofficeWrapperPageSection>

          <BackofficeWrapperPageSection title={t('sections.checking_account.title')} subtitle={t('sections.checking_account.subtitle')}>
            <SimpleGrid cols={1}>TBD</SimpleGrid>
          </BackofficeWrapperPageSection>
        </BackofficeWrapperPage>
      </form>
    </UserFormProvider>
  );
}
