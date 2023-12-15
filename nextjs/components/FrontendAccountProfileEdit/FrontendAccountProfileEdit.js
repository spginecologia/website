'use client';

/* * */

import { useTranslations } from 'next-intl';
import { useForm, yupResolver } from '@mantine/form';
import { UserDefault } from '@/schemas/User/default';
import { UserValidation } from '@/schemas/User/validation';
import styles from './FrontendAccountProfileEdit.module.css';
import FrontendAccountProfileEditSection from '../FrontendAccountProfileEditSection/FrontendAccountProfileEditSection';
import TextField from '@/components/TextField/TextField';
import populate from '@/services/populate';
import useSWR from 'swr';

/* * */

export default function FrontendAccountProfileEdit() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendAccountProfileEdit');

  //
  // B. Fetch data

  const { data: profileData, error: profileError, isLoading: profileLoading, isValidating: profileValidating, mutate: profileMutate } = useSWR('/api/account/profile', { onSuccess: (data) => keepFormUpdated(data) });

  console.log(profileData);

  //
  // B. Setup form

  const form = useForm({
    clearInputErrorOnChange: true,
    validate: yupResolver(UserValidation),
    initialValues: UserDefault,
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
      <FrontendAccountProfileEditSection title={'Os Seus Dados'} description={'Por favor mantenha os seus dados atualizados. Se pretender alterar o NIF ou Número da Ordem, deverá entrar em contacto com o Secretariado da SPG.'}>
        <TextField type="email" label={'Nome'} placeholder={'hoen'} {...form.getInputProps('email')} />
        <TextField type="email" label={'Nome'} placeholder={'hoen'} {...form.getInputProps('email')} />
        <TextField type="email" label={'Nome'} placeholder={'hoen'} {...form.getInputProps('email')} />
        <TextField type="email" label={'Nome'} placeholder={'hoen'} {...form.getInputProps('email')} />
        <TextField type="email" label={'Nome'} placeholder={'hoen'} {...form.getInputProps('email')} />
      </FrontendAccountProfileEditSection>
      <FrontendAccountProfileEditSection>
        <TextField type="email" label={'Nome'} placeholder={'hoen'} {...form.getInputProps('email')} />
      </FrontendAccountProfileEditSection>
    </div>
  );
}
