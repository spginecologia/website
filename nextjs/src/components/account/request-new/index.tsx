'use client'

import Link from "next/link"
import styles from "./styles.module.css"
import Image from "next/image"
import { Account as Accounts, Media } from "@/payload-types"
import { FormDateTimePicker, FormInput, FormSection, FormSelect, MultipleCheckbox } from "@/components/common/Form"
import Button from "@/components/common/Button"
import { useForm } from "react-hook-form"
import { useState } from "react"

export default function RequestNew({ account, title, blockTitle, buttonsText }: { account: Accounts, title: string, blockTitle: string, buttonsText: string}) {
    const { register, handleSubmit, watch } = useForm();
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
                    placeholder="Nenhum"
                    onChange={setSection}
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
                <div className={styles.smallLabel}>Este email será o seu nome de utilizador.</div>
                <FormSection
                    title={'Os Seus Dados'}
                    description={
                        'Por favor preencha os campos seguintes com os seus dados atuais.'
                    }
                />
                <FormInput placeholder="" label="Número de Sócio SPG" />
                <div className={styles.smallLabel}>Se não souber o seu número de Sócio SPG, pode deixar este campo em branco. No entanto, o processo de confirmação de conta poderá ser mais demorado.</div>
                <FormInput placeholder="" label="Número de Contribuinte" />
                <div className={styles.smallLabel}>Por favor indique o seu NIF pessoal. Por motivos alheios não podemos aceitar NIF&apos;s institucionais.</div>
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
                    Submeter Dados
                </Button>
                <div className={styles.privacyPolicy}>Ao submeter os seus dados aceita que a SPG guarde as suas informações na base de dados de sócios unicamente para comunicações relacionadas com a sua conta e o ocasional envio da newsletter. Para mais informações consulte a nossa <a href="/privacidade">Política de Privacidade</a>.</div>
            </div>
            <div className={styles.rightBlock}>
                <Image alt="" src={(account.logo as Media)?.url ?? '/placeholder.png'} width={565} height={250}></Image>
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
                    <b>Se {title === 'Novo Sócio SPG' ? 'já' : 'ainda não'} é Sócio SPG</b> basta que nos envie os seus dados <a className={styles.inlinea} href={title === 'Novo Sócio SPG' ? "/account/request" : '/account/new'}>clicando aqui</a>. Vamos confirmar as suas informações e dar-lhe acesso à sua conta. Todo o proceso poderá demorar uma semana.
                </div>
                <div className={styles.buttons}>
                    <Link href={title === 'Novo Sócio SPG' ? "/account/request" : '/account/new'}>
                        {buttonsText}
                    </Link>
                </div>
            </div>
        </div>
    )
}