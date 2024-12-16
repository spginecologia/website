'use client';

/* * */

import AppAuthenticationCheck, { isAllowed } from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import BackofficeWrapperPage from '@/components/BackofficeWrapperPage/BackofficeWrapperPage';
import BackofficeWrapperPageSection from '@/components/BackofficeWrapperPageSection/BackofficeWrapperPageSection';
import Text from '@/components/Text/Text';
import UserActivityBadge from '@/components/UserActivityBadge/UserActivityBadge';
import { UserDefault } from '@/schemas/User/default';
import { UserFormProvider, useUserForm } from '@/schemas/User/form';
import { UserOptions } from '@/schemas/User/options';
import { UserValidation } from '@/schemas/User/validation';
import API from '@/services/API';
import notify from '@/services/notify';
import populate from '@/services/populate';
import { Button, Divider, Group, MultiSelect, Select, SimpleGrid, Switch, Textarea, TextInput } from '@mantine/core';
import { DatePicker, DatePickerInput, DateTimePicker } from '@mantine/dates';
import { yupResolver } from '@mantine/form';
import { openConfirmModal } from '@mantine/modals';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

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
	const isReadOnly = false; // !isAllowed(session, 'users', 'create_edit');

	//
	// B. Fetch data

	const { mutate: allUsersMutate } = useSWR('/api/users');
	const { data: userData, error: userError, isLoading: userLoading, isValidating: userValidating, mutate: userMutate } = useSWR(user_id && `/api/users/${user_id}`, { onSuccess: data => keepFormUpdated(data) });

	//
	// C. Setup form

	const userForm = useUserForm({
		clearInputErrorOnChange: true,
		initialValues: populate(UserDefault, userData),
		validate: yupResolver(UserValidation),
		validateInputOnBlur: true,
		validateInputOnChange: true,
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
			await API({ body: userForm.values, method: 'PUT', operation: 'edit', resourceId: user_id, service: 'users' });
			userMutate();
			allUsersMutate();
			userForm.resetDirty();
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
					notify(user_id, 'loading', t('operations.delete.loading'));
					await API({ method: 'DELETE', operation: 'delete', resourceId: user_id, service: 'users' });
					allUsersMutate();
					router.push('/admin/users');
					notify(user_id, 'success', t('operations.delete.success'));
					setIsDeleting(false);
				}
				catch (err) {
					console.log(err);
					setIsDeleting(false);
					notify(user_id, 'error', err.message || t('operations.delete.error'));
				}
			},
			title: <Text text={t('operations.delete.title')} />,
		});
	};

	const handleSetPresetPermissions = (preset) => {
		switch (preset) {
			case 'accountant':
				userForm.setValues({
					permissions: UserOptions.permissions_presets.accountant,
				});
				return;
			case 'admin':
				userForm.setValues({
					permissions: UserOptions.permissions_presets.admin,
				});
				return;
			case 'candidate':
				userForm.setValues({
					permissions: UserOptions.permissions_presets.candidate,
				});
				return;
			case 'member':
				userForm.setValues({
					permissions: UserOptions.permissions_presets.member,
				});
				return;
			case 'publisher':
				userForm.setValues({
					permissions: UserOptions.permissions_presets.publisher,
				});
				return;
			case 'reviewer':
				userForm.setValues({
					permissions: UserOptions.permissions_presets.reviewer,
				});
				return;
			case 'secretary':
				userForm.setValues({
					permissions: UserOptions.permissions_presets.secretary,
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
					isDeleting={isDeleting}
					isDirty={userForm.isDirty()}
					isErrorSaving={hasErrorSaving}
					isErrorValidating={userError}
					isLoading={userLoading}
					isSaving={isSaving}
					isValid={userForm.isValid()}
					isValidating={userValidating}
					onClose={handleClose}
					onDelete={handleDelete}
					onSave={handleSave}
					title={userData?.display_name || t('untitled')}
				>
					<BackofficeWrapperPageSection subtitle={t('sections.status.subtitle')} title={t('sections.status.title')} defaultOpen>
						<SimpleGrid cols={3}>
							<DateTimePicker
								description={userForm.values.last_active ? t('fields.last_active.was_active', { value: relativeTimeFormatter.relativeTime(new Date(userForm.values.last_active), nowForRelativeTime) }) : t('fields.last_active.was_never_active')}
								label={t('fields.last_active.label')}
								placeholder={t('fields.last_active.placeholder')}
								{...userForm.getInputProps('last_active')}
								value={userForm.values.last_active ? new Date(userForm.values.last_active) : null}
								valueFormat="ddd, D [de] MMMM [de] YYYY [às] hh:mm"
								readOnly
							/>
							<DatePickerInput
								description={t('fields.membership_date.description')}
								label={t('fields.membership_date.label')}
								placeholder={t('fields.membership_date.placeholder')}
								{...userForm.getInputProps('membership_date')}
								readOnly={isReadOnly}
								value={userForm.values.membership_date ? new Date(userForm.values.membership_date) : null}
								valueFormat="ddd, D [de] MMMM [de] YYYY"
								clearable
							/>
							<DatePickerInput
								description={t('fields.registration_date.description')}
								label={t('fields.registration_date.label')}
								placeholder={t('fields.registration_date.placeholder')}
								{...userForm.getInputProps('registration_date')}
								value={userForm.values.registration_date ? new Date(userForm.values.registration_date) : null}
								valueFormat="ddd, D [de] MMMM [de] YYYY"
								disabled
								readOnly
							/>
						</SimpleGrid>
					</BackofficeWrapperPageSection>

					<BackofficeWrapperPageSection subtitle={t('sections.references.subtitle')} title={t('sections.references.title')}>
						<SimpleGrid cols={3}>
							<Select label={t('fields.title.label')} nothingFoundMessage={t('fields.title.nothingFound')} placeholder={t('fields.title.placeholder')} {...userForm.getInputProps('title')} data={UserOptions.title} clearable searchable />
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
								readOnly={isReadOnly}
								value={userForm.values.birthday ? new Date(userForm.values.birthday) : null}
								valueFormat="ddd, D [de] MMMM [de] YYYY"
								clearable
							/>
						</SimpleGrid>
					</BackofficeWrapperPageSection>

					<BackofficeWrapperPageSection subtitle={t('sections.contacts.subtitle')} title={t('sections.contacts.title')}>
						<SimpleGrid cols={2}>
							<TextInput label={t('fields.email.label')} placeholder={t('fields.email.placeholder')} type="email" {...userForm.getInputProps('email')} readOnly={isReadOnly} />
							<TextInput label={t('fields.phone.label')} placeholder={t('fields.phone.placeholder')} type="tel" {...userForm.getInputProps('phone')} readOnly={isReadOnly} />
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

					<BackofficeWrapperPageSection subtitle={t('sections.activity_interests.subtitle')} title={t('sections.activity_interests.title')}>
						<SimpleGrid cols={2}>
							<TextInput label={t('fields.workplace_primary.label')} placeholder={t('fields.workplace_primary.placeholder')} {...userForm.getInputProps('workplace_primary')} readOnly={isReadOnly} />
							<TextInput label={t('fields.workplace_secondary.label')} placeholder={t('fields.workplace_secondary.placeholder')} {...userForm.getInputProps('workplace_secondary')} readOnly={isReadOnly} />
						</SimpleGrid>
						<SimpleGrid cols={2}>
							<MultiSelect label={t('fields.favorite_sections.label')} nothingFoundMessage={t('fields.favorite_sections.nothingFound')} placeholder={t('fields.favorite_sections.placeholder')} {...userForm.getInputProps('favorite_sections')} data={UserOptions.title} clearable searchable />
							<MultiSelect label={t('fields.favorite_topics.label')} nothingFoundMessage={t('fields.favorite_topics.nothingFound')} placeholder={t('fields.favorite_topics.placeholder')} {...userForm.getInputProps('favorite_topics')} data={UserOptions.title} clearable searchable />
						</SimpleGrid>
					</BackofficeWrapperPageSection>

					<BackofficeWrapperPageSection subtitle={t('sections.billing.subtitle')} title={t('sections.billing.title')}>
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

					<BackofficeWrapperPageSection subtitle={t('sections.communications.subtitle')} title={t('sections.communications.title')}>
						<SimpleGrid cols={3}>
							<Switch description={t('fields.send_mandatory_communications.description')} label={t('fields.send_mandatory_communications.label')} size="md" checked disabled />
							<Switch description={t('fields.send_notifications.description')} label={t('fields.send_notifications.label')} size="md" {...userForm.getInputProps('send_notifications', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.send_newsletter.description')} label={t('fields.send_newsletter.label')} size="md" {...userForm.getInputProps('send_newsletter', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>
					</BackofficeWrapperPageSection>

					<BackofficeWrapperPageSection subtitle={t('sections.observations.subtitle')} title={t('sections.observations.title')}>
						<SimpleGrid cols={1}>
							<Textarea label={t('fields.admin_observations.label')} placeholder={t('fields.admin_observations.placeholder')} {...userForm.getInputProps('admin_observations')} readOnly={isReadOnly} rows={8} />
						</SimpleGrid>
					</BackofficeWrapperPageSection>

					<BackofficeWrapperPageSection subtitle={t('sections.permissions.subtitle')} title={t('sections.permissions.title')}>
						<SimpleGrid cols={4}>
							<Button color="gray" onClick={() => handleSetPresetPermissions('candidate')} variant="default">
								{t('sections.permissions.presets.candidate.label')}
							</Button>
							<Button color="gray" onClick={() => handleSetPresetPermissions('member')} variant="default">
								{t('sections.permissions.presets.member.label')}
							</Button>
							<Button color="gray" onClick={() => handleSetPresetPermissions('reviewer')} variant="default">
								{t('sections.permissions.presets.reviewer.label')}
							</Button>
							<Button color="gray" onClick={() => handleSetPresetPermissions('publisher')} variant="default">
								{t('sections.permissions.presets.publisher.label')}
							</Button>
							<Button color="gray" onClick={() => handleSetPresetPermissions('accountant')} variant="default">
								{t('sections.permissions.presets.accountant.label')}
							</Button>
							<Button color="gray" onClick={() => handleSetPresetPermissions('secretary')} variant="default">
								{t('sections.permissions.presets.secretary.label')}
							</Button>
							<Button color="gray" onClick={() => handleSetPresetPermissions('admin')} variant="default">
								{t('sections.permissions.presets.admin.label')}
							</Button>
						</SimpleGrid>

						<Divider label={t('fields.permissions.admin.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.admin.backoffice.description')} label={t('fields.permissions.admin.backoffice.label')} size="md" {...userForm.getInputProps('permissions.admin.backoffice.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.admin.debug.description')} label={t('fields.permissions.admin.debug.label')} size="md" {...userForm.getInputProps('permissions.admin.debug.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>

						<Divider label={t('fields.permissions.news.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.news.create_edit.description')} label={t('fields.permissions.news.create_edit.label')} size="md" {...userForm.getInputProps('permissions.news.create_edit.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.news.delete.description')} label={t('fields.permissions.news.delete.label')} size="md" {...userForm.getInputProps('permissions.news.delete.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>

						<Divider label={t('fields.permissions.agenda.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.agenda.create_edit.description')} label={t('fields.permissions.agenda.create_edit.label')} size="md" {...userForm.getInputProps('permissions.agenda.create_edit.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.agenda.delete.description')} label={t('fields.permissions.agenda.delete.label')} size="md" {...userForm.getInputProps('permissions.agenda.delete.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>

						<Divider label={t('fields.permissions.videos.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.videos.view.description')} label={t('fields.permissions.videos.view.label')} size="md" {...userForm.getInputProps('permissions.videos.view.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.videos.upload.description')} label={t('fields.permissions.videos.upload.label')} size="md" {...userForm.getInputProps('permissions.videos.upload.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.videos.create_edit_own.description')} label={t('fields.permissions.videos.create_edit_own.label')} size="md" {...userForm.getInputProps('permissions.videos.create_edit_own.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.videos.approve.description')} label={t('fields.permissions.videos.approve.label')} size="md" {...userForm.getInputProps('permissions.videos.approve.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.videos.create_edit_all.description')} label={t('fields.permissions.videos.create_edit_all.label')} size="md" {...userForm.getInputProps('permissions.videos.create_edit_all.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.videos.delete.description')} label={t('fields.permissions.videos.delete.label')} size="md" {...userForm.getInputProps('permissions.videos.delete.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>

						<Divider label={t('fields.permissions.guidelines.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.guidelines.create_edit.description')} label={t('fields.permissions.guidelines.create_edit.label')} size="md" {...userForm.getInputProps('permissions.guidelines.create_edit.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.guidelines.delete.description')} label={t('fields.permissions.guidelines.delete.label')} size="md" {...userForm.getInputProps('permissions.guidelines.delete.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>

						<Divider label={t('fields.permissions.publications.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.publications.create_edit.description')} label={t('fields.permissions.publications.create_edit.label')} size="md" {...userForm.getInputProps('permissions.publications.create_edit.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.publications.delete.description')} label={t('fields.permissions.publications.delete.label')} size="md" {...userForm.getInputProps('permissions.publications.delete.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>

						<Divider label={t('fields.permissions.courses.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.courses.create_edit.description')} label={t('fields.permissions.courses.create_edit.label')} size="md" {...userForm.getInputProps('permissions.courses.create_edit.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.courses.delete.description')} label={t('fields.permissions.courses.delete.label')} size="md" {...userForm.getInputProps('permissions.courses.delete.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>

						<Divider label={t('fields.permissions.topics.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.topics.create_edit.description')} label={t('fields.permissions.topics.create_edit.label')} size="md" {...userForm.getInputProps('permissions.topics.create_edit.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.topics.delete.description')} label={t('fields.permissions.topics.delete.label')} size="md" {...userForm.getInputProps('permissions.topics.delete.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>

						<Divider label={t('fields.permissions.testimonials.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.testimonials.create_edit.description')} label={t('fields.permissions.testimonials.create_edit.label')} size="md" {...userForm.getInputProps('permissions.testimonials.create_edit.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.testimonials.delete.description')} label={t('fields.permissions.testimonials.delete.label')} size="md" {...userForm.getInputProps('permissions.testimonials.delete.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>

						<Divider label={t('fields.permissions.tributes.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.tributes.create_edit.description')} label={t('fields.permissions.tributes.create_edit.label')} size="md" {...userForm.getInputProps('permissions.tributes.create_edit.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.tributes.delete.description')} label={t('fields.permissions.tributes.delete.label')} size="md" {...userForm.getInputProps('permissions.tributes.delete.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>

						<Divider label={t('fields.permissions.users.divider.label')} labelPosition="left" mt={20} />
						<SimpleGrid cols={3}>
							<Switch description={t('fields.permissions.users.view.description')} label={t('fields.permissions.users.view.label')} size="md" {...userForm.getInputProps('permissions.users.view.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.users.create.description')} label={t('fields.permissions.users.create.label')} size="md" {...userForm.getInputProps('permissions.users.create.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.users.edit.description')} label={t('fields.permissions.users.edit.label')} size="md" {...userForm.getInputProps('permissions.users.edit.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.users.edit_permissions.description')} label={t('fields.permissions.users.edit_permissions.label')} size="md" {...userForm.getInputProps('permissions.users.edit_permissions.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.users.approve.description')} label={t('fields.permissions.users.approve.label')} size="md" {...userForm.getInputProps('permissions.users.approve.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.users.charge_money.description')} label={t('fields.permissions.users.charge_money.label')} size="md" {...userForm.getInputProps('permissions.users.charge_money.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
							<Switch description={t('fields.permissions.users.delete.description')} label={t('fields.permissions.users.delete.label')} size="md" {...userForm.getInputProps('permissions.users.delete.is_allowed', { type: 'checkbox' })} readOnly={isReadOnly} />
						</SimpleGrid>
					</BackofficeWrapperPageSection>

					<BackofficeWrapperPageSection subtitle={t('sections.checking_account.subtitle')} title={t('sections.checking_account.title')}>
						<SimpleGrid cols={1}>TBD</SimpleGrid>
					</BackofficeWrapperPageSection>
				</BackofficeWrapperPage>
			</form>
		</UserFormProvider>
	);
}
