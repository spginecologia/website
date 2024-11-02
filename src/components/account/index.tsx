import Link from "next/link"
import Button from "../common/Button"
import styles from "./styles.module.css"
import Image from "next/image"
import { Account as Accounts, Media } from "@/payload-types"
import { FormInput } from "../common/Form"

export default function Account({ account }: { account: Accounts }) {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.form}>
                <div className={styles.formTitle}>
                    Login
                </div>
                <FormInput placeholder="Email" label="Email" />
                <FormInput placeholder="Password" label="Password" />
                <Button type="submit">
                    Iniciar Sessão
                </Button>
                <Link className={styles.lostPassword} href="/lost-password">Recuperar Password</Link>
            </div>
            <div className={styles.rightBlock}>
                <Image alt="" src={(account.logo as Media)?.url ?? '/placeholder.png'} width={565} height={250}></Image>
                <div className={styles.blockTitle}>Ainda não tem conta SPG?</div>
                <div className={styles.description}>
                    Usufrua das tecnologias que colocamos à sua disposição para consultar, discutir e partilhar documentos, vídeos e cursos científicos relacionados com a especialidade.
                </div>
                <div className={styles.description}>
                    Se já é Sócio SPG, basta que nos envie os seus dados para que possamos confirmar e activar a sua conta. Se ainda não é Sócio SPG, preencha o formulário para formalizar a sua candidatura, que será submetida a aprovação em Assembleia Geral.
                </div>
                <div className={styles.buttons}>
                    <Link href={"/account/request"}>Já sou sócio SPG</Link>
                    <Link href={"/account/new"}>ainda não sou sócio SPG</Link>
                </div>
            </div>
        </div>
    )
}