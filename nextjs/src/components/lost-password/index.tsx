import Link from "next/link"
import Button from "../common/Button"
import styles from "./styles.module.css"
import { FormInput, FormTitle } from "../common/Form"

export default function LostPassword() {
    return (
        <div className={styles.pageWrapper}>
            <form className={styles.form}>
                <FormTitle>
                    Alterar Password
                </FormTitle>
                <div className={styles.description}>
                    Para alterar a sua password introduza o email que utiliza para fazer login na sua Conta SPG. De seguida, aceda à sua caixa de correio e clique no link que recebeu.
                </div>
                <FormInput placeholder="" label="Email" />
                <label className={styles.smallLabel}>Introduza o email que utiliza para fazer login na sua Conta SPG.</label>
                <Button type="submit">
                    Pedir Alteração de Password
                </Button>
            </form>
        </div>
    )
}