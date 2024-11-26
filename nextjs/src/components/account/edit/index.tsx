'use client';

import Button from '@/components/common/Button';
import { FormDateTimePicker, FormInput, FormSection, FormSelect, MultipleCheckbox } from '@/components/common/Form';
import { Account as Accounts, Media } from '@/payload-types';
import Image from 'next/image';

import styles from './styles.module.css';

export default function Edit({ account, title }: { account: Accounts, title: string }) {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.leftBlock}>
				<Image alt="" height={740} src={(account.logo_logged as Media)?.url ?? '/placeholder.png'} width={560} />
			</div>
			<div className={styles.rightForm}>
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
				<div className={styles.smallLabel}>Se alterar o seu email terá de iniciar sessão novamente.</div>
				<FormSection
					description="Por favor mantenha os seus dados atualizados. Se pretender alterar o NIF ou Número da Ordem, deverá entrar em contacto com o Secretariado da SPG."
					title="Os Seus Dados"
				/>
				<FormInput label="Número de Sócio SPG" placeholder="" />
				<div className={styles.smallLabel}>Por favor indique o seu NIF pessoal. Por motivos alheios não podemos aceitar NIF&apos;s institucionais. Para alterar este campo por favor entre em contacto com o Secretariado SPG.</div>
				<FormInput label="Número de Contribuinte" placeholder="" />
				<div className={styles.smallLabel}>Para alterar este campo por favor entre em contacto com o Secretariado SPG.</div>
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
					Guardar Alterações
				</Button>
				<Button variant="secondary">
					Cancelar
				</Button>
			</div>
		</div>
	);
}
