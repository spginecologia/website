"use client"

import Link from "next/link"
import Button from "../common/Button"
import styles from "./styles.module.css"
import Image from "next/image"
import { Account as Accounts, Media, User } from "@/payload-types"
import { FormInput } from "../common/Form"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { tryLogin } from "@/functions/login"
import { useRouter } from "next/navigation"
import nookies from 'nookies';
import { fetchUser } from "@/functions/fetchUser"

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function Account({ account }: { account: Accounts }) {
    const cookies = nookies.get();
    const token = cookies.authToken;
    const [loggingIn, setLoggingIn] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loggedIn, setLoggedIn] = useState(token ?? false);

    const handleFetchUser = async () => {
        if (token) {
            const user = await fetchUser();
            setUser(user?.user)
        }
    }
    
    useEffect(() => {
        handleFetchUser();
    }, []);
    
    console.log(user)

    const { register, handleSubmit } = useForm<LoginFormInputs>();

    const handleLogin = async (data: LoginFormInputs) => {
        const { email, password } = data;
        await tryLogin(email, password, setLoggingIn);
        router.push('/');
    };
    
    return !loggedIn ? (
        <div className={styles.pageWrapper}>
            <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
                <div className={styles.formTitle}>Login</div>
                <FormInput 
                    placeholder="Email" 
                    label="Email"
                    {...register("email", { required: "Email is required" })}
                />
                <FormInput 
                    placeholder="Password" 
                    label="Password" 
                    type="password"
                    {...register("password", { required: "Password is required" })}
                />
                <Button type="submit">{loggingIn ? 'Logging In...' : 'Iniciar Sessão'}</Button>
                <Link className={styles.lostPassword} href="/lost-password">
                    Recuperar Password
                </Link>
            </form>
            
            <div className={styles.rightBlock}>
                <Image alt="" src={(account.logo as Media)?.url ?? '/placeholder.png'} width={565} height={250} />
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
    ) : (
        <div className={styles.pageWrapperLogged}>
            <div className={styles.leftBlock}>
                <Image alt="" src={(account.logo_logged as Media)?.url ?? '/placeholder.png'} width={560} height={700}></Image>
            </div>
            <div>
                <div className={styles.rightBlock}>
                    <div className={styles.formTitle}>
                        Perfil de Sócio
                    </div>
                    <div className={styles.smallLabel}>Nome</div>
                    <div className={styles.text}>{user?.title} {user?.full_name}</div>
                    <div className={styles.nifEmail}>
                        <div>
                            <div className={styles.smallLabel}>Número de Contribuinte</div>
                            <div className={styles.text}>{user?.tax_number}</div>
                        </div>
                        <div>
                            <div className={styles.smallLabel}>Email</div>
                            <div className={styles.text}>{user?.email}</div>
                        </div>
                    </div>
                    <div className={styles.smallLabel}>Morada</div>
                    <div className={styles.text}>{user?.address}</div>

                    <div className={styles.buttonsLogged}>
                        <Link href="/account/edit">Editar perfil</Link>
                        <Link href="/account/password-reset">Alterar Password</Link>
                        <Link href="">Terminar Sessão</Link>
                        <Link target="_blank" href="/admin/collections/videos">Gerir vídeos</Link>
                        <Link target="_blank" href="/admin/collections/users">Gerir utilizadores</Link>
                        <Link target="_blank" href="/admin">Backoffice</Link>
                    </div>
                </div>
                <div className={styles.rightBlock}>
                    <div className={styles.formTitle}>
                        Os meus Vídeos
                    </div>
                    <div className={styles.smallLabel}>Ainda não publicou nenhum vídeo. Porque não partilhar a sua experiência cirúrgica com a comunidade científica da SPG?</div>
                    <Button variant="secondary">Submeter vídeo cirúrgico</Button>
                </div>
            </div>
        </div>
    )
}