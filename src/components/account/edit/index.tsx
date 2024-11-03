"use client"

import styles from "./styles.module.css"
import Image from "next/image"
import { Account as Accounts, Media } from "@/payload-types"
import { FormDateTimePicker, FormInput, FormSection, FormSelect, MultipleCheckbox } from "@/components/common/Form"
import Button from "@/components/common/Button"

export default function Edit({ account, title }: { account: Accounts, title: string }) {
    
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.leftBlock}>
                <Image alt="" src={(account.logo_logged as Media)?.url ?? '/placeholder.png'} width={560} height={740}></Image>
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
                        { value: 'sr', label: 'Sr.' },
                        { value: 'sra', label: 'Sr.ª' },
                        { value: 'dr', label: 'Dr.' },
                        { value: 'dra', label: 'Dr.ª' },
                        { value: 'professor', label: 'Prof.' },
                        { value: 'professora', label: 'Prof.ª' },
                        { value: 'exmo', label: 'Exmo.' },
                        { value: 'exma', label: 'Exmo.ª' },
                    ]}
                />
                <FormInput placeholder="" label="Nome" />
                <FormInput placeholder="" label="Apelido" />
                <FormInput placeholder="" label="Nome Completo" />
                <FormInput placeholder="" label="Telefone" />
                <FormInput placeholder="" label="Email" />
                <div className={styles.smallLabel}>Se alterar o seu email terá de iniciar sessão novamente.</div>
                <FormSection
                    title={'Os Seus Dados'}
                    description={
                        'Por favor mantenha os seus dados atualizados. Se pretender alterar o NIF ou Número da Ordem, deverá entrar em contacto com o Secretariado da SPG.'
                    }
                />
                <FormInput placeholder="" label="Número de Sócio SPG" />
                <div className={styles.smallLabel}>Por favor indique o seu NIF pessoal. Por motivos alheios não podemos aceitar NIF&apos;s institucionais. Para alterar este campo por favor entre em contacto com o Secretariado SPG.</div>
                <FormInput placeholder="" label="Número de Contribuinte" />
                <div className={styles.smallLabel}>Para alterar este campo por favor entre em contacto com o Secretariado SPG.</div>
                <FormInput placeholder="" label="Número de Cédula Médica" />
                <FormDateTimePicker label="Data de Nascimento" placeholder="" />
                <FormSection
                    title={'A Sua Actividade'}
                    description={
                        'Por favor indique-nos qual a sua actividade.'
                    }
                />
                <FormInput placeholder="" label="Local de Trabalho Principal" />
                <FormInput placeholder="" label="Local de Trabalho Secundário" />
                <MultipleCheckbox 
                    label="Secções de Interesse"
                    options={
                        [
                            { value: 'colposcopia_patologia_tracto_genital_inferior', label: 'Colposcopia Patologia Tracto Genital Inferior' },
                            { value: 'endoscopia_genecologica', label: 'Endoscopia Ginecológica' },
                            { value: 'ginecologia_oncologica', label: 'Ginecologia Oncológica' },
                            { value: 'menopausa', label: 'Menopausa' },
                            { value: 'uroginecologia', label: 'Uroginecologia'}
                        ]
                } />
                <FormSection
                    title={'Correspondência'}
                    description={
                        'Por favor indique onde gostaria de receber correspondência da SPG.'
                    }
                />
                <FormInput placeholder="" label="Morada" />
                <FormInput placeholder="" label="Morada (Continuação)" />
                <FormInput placeholder="" label="Código Postal" />
                <FormInput placeholder="" label="Cidade" />
                <FormInput placeholder="" label="País" />
                <Button type="submit">
                    Guardar Alterações
                </Button>
                <Button variant="secondary">
                    Cancelar
                </Button>
            </div>
        </div>
    )
}