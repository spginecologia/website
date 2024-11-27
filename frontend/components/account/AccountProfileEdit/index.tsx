'use client';

/* * */

import { AccountProfileEditSection } from '@/components/account/AccountProfileEditSection';
import TextField from '@/components/TextField/TextField';
import { UserDefault } from '@/schemas/User/default';
import { UserValidation } from '@/schemas/User/validation';
import populate from '@/services/populate';
import { useForm, yupResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountProfileEdit() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountProfileEdit');

	//
	// B. Fetch data

	const { data: profileData } = useSWR('/api/account/profile', { onSuccess: data => keepFormUpdated(data) });

	console.log(profileData);

	//
	// B. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: UserDefault,
		validate: yupResolver(UserValidation),
	});

	const keepFormUpdated = (data) => {
		if (!form.isDirty()) {
			const populated = populate(UserDefault, data);
			form.setValues(populated);
			form.resetDirty(populated);
		}
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<AccountProfileEditSection description="Por favor mantenha os seus dados atualizados. Se pretender alterar o NIF ou Número da Ordem, deverá entrar em contacto com o Secretariado da SPG." title="Os Seus Dados">
				<TextField label="Nome" placeholder="hoen" type="email" {...form.getInputProps('email')} />
				<TextField label="Nome" placeholder="hoen" type="email" {...form.getInputProps('email')} />
				<TextField label="Nome" placeholder="hoen" type="email" {...form.getInputProps('email')} />
				<TextField label="Nome" placeholder="hoen" type="email" {...form.getInputProps('email')} />
				<TextField label="Nome" placeholder="hoen" type="email" {...form.getInputProps('email')} />
			</AccountProfileEditSection>
			<AccountProfileEditSection>
				<TextField label="Nome" placeholder="hoen" type="email" {...form.getInputProps('email')} />
			</AccountProfileEditSection>
		</div>
	);
}
