'use client';

import Button from '@/components/common/Button';
import { FormDateTimePicker, FormInput, FormSection, FormSelect, MultipleCheckbox } from '@/components/common/Form';
import { Account as Accounts, Media } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

export default function RequestNew({ account, blockTitle, buttonsText, title }: { account: Accounts, blockTitle: string, buttonsText: string, title: string }) {
	const { handleSubmit, register, watch } = useForm();
	const [section, setSection] = useState('');

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.form}>
				<div className={styles.formTitle}>
					{title}
					{title === 'Novo Sócio SPG' && (
						<a href="/account/request">
							Se já é Sócio SPG, peça acesso à sua conta aqui ›
						</a>
					)}
				</div>
				<FormSelect
					label="Título"
					onChange={setSection}
					placeholder="Nenhum"
					data={[
						{ label: 'Sr.', value: 'sr' },
						{ label: 'Sr.ª', value: 'sra' },
						{ label: 'Dr.', value: 'dr' },
						{ label: 'Dr.ª', value: 'dra' },
						{ label: 'Prof.', value: 'professor' },
						{ label: 'Prof.ª', value: 'professora' },
						{ label: 'Exmo.', value: 'exmo' },
						{ label: 'Exmo.ª', value: 'exma' },
					]}
				/>
				<FormInput label="Nome" placeholder="" />
				<FormInput label="Apelido" placeholder="" />
				<FormInput label="Nome Completo" placeholder="" />
				<FormInput label="Telefone" placeholder="" />
				<FormInput label="Email" placeholder="" />
				<div className={styles.smallLabel}>Este email será o seu nome de utilizador.</div>
				<FormSection
					description="Por favor preencha os campos seguintes com os seus dados atuais."
					title="Os Seus Dados"
				/>
				<FormInput label="Número de Sócio SPG" placeholder="" />
				<div className={styles.smallLabel}>Se não souber o seu número de Sócio SPG, pode deixar este campo em branco. No entanto, o processo de confirmação de conta poderá ser mais demorado.</div>
				<FormInput label="Número de Contribuinte" placeholder="" />
				<div className={styles.smallLabel}>Por favor indique o seu NIF pessoal. Por motivos alheios não podemos aceitar NIF&apos;s institucionais.</div>
				<FormInput label="Número de Cédula Médica" placeholder="" />
				<FormDateTimePicker label="Data de Nascimento" placeholder="" />
				<FormSection
					description="Por favor indique-nos qual a sua actividade."
					title="A Sua Actividade"
				/>
				<FormInput label="Local de Trabalho Principal" placeholder="" />
				<FormInput label="Local de Trabalho Secundário" placeholder="" />
				<MultipleCheckbox
					label="Secções de Interesse"
					options={
						[
							{ label: 'Colposcopia Patologia Tracto Genital Inferior', value: 'colposcopia_patologia_tracto_genital_inferior' },
							{ label: 'Endoscopia Ginecológica', value: 'endoscopia_genecologica' },
							{ label: 'Ginecologia Oncológica', value: 'ginecologia_oncologica' },
							{ label: 'Menopausa', value: 'menopausa' },
							{ label: 'Uroginecologia', value: 'uroginecologia' },
						]
					}
				/>
				<FormSection
					description="Por favor indique onde gostaria de receber correspondência da SPG."
					title="Correspondência"
				/>
				<FormInput label="Morada" placeholder="" />
				<FormInput label="Morada (Continuação)" placeholder="" />
				<FormInput label="Código Postal" placeholder="" />
				<FormInput label="Cidade" placeholder="" />
				<FormInput label="País" placeholder="" />
				<Button type="submit">
					Submeter Dados
				</Button>
				<div className={styles.privacyPolicy}>Ao submeter os seus dados aceita que a SPG guarde as suas informações na base de dados de sócios unicamente para comunicações relacionadas com a sua conta e o ocasional envio da newsletter. Para mais informações consulte a nossa <a href="/privacidade">Política de Privacidade</a>.</div>
			</div>
			<div className={styles.rightBlock}>
				<Image alt="" height={250} src={(account.logo as Media)?.url ?? '/placeholder.png'} width={565} />
				<div className={styles.blockTitle}>
					{blockTitle}
				</div>
				<div className={styles.description}>
					Contribua para o futuro desta especialidade. Ao tornar-se Sócio SPG ganha acesso às áreas reservadas da Academia SPG, onde pode partilhar as suas experiências cirúrgicas e discutir conteúdos científicos de qualidade com a comunidade ginecológica.
				</div>
				<div className={styles.description}>
					A sua candidatura será submetida a aprovação em Assembleia Geral na próxima reunião da Sociedade. Se precisar de algum esclarecimento, teremos todo o prazer em falar consigo através dos contactos que colocamos à sua disposição.
				</div>
				<div className={styles.description}>
					<b>Se {title === 'Novo Sócio SPG' ? 'já' : 'ainda não'} é Sócio SPG</b> basta que nos envie os seus dados <a className={styles.inlinea} href={title === 'Novo Sócio SPG' ? '/account/request' : '/account/new'}>clicando aqui</a>. Vamos confirmar as suas informações e dar-lhe acesso à sua conta. Todo o proceso poderá demorar uma semana.
				</div>
				<div className={styles.buttons}>
					<Link href={title === 'Novo Sócio SPG' ? '/account/request' : '/account/new'}>
						{buttonsText}
					</Link>
				</div>
			</div>
		</div>
	);
}
