'use client';

import Button from '@/components/common/Button';
import { FormInput } from '@/components/common/Form';
import { fetchUser } from '@/functions/fetchUser';
import { tryLogin } from '@/functions/login';
import { Account as Accounts, Media, User } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import nookies from 'nookies';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

interface LoginFormInputs {
	email: string
	password: string
}

export default function Account({ account }: { account: Accounts }) {
	const cookies = nookies.get();
	const token = cookies.authToken;
	const [loggingIn, setLoggingIn] = useState(false);
	const router = useRouter();
	const [user, setUser] = useState<undefined | User>(undefined);
	const [loggedIn, setLoggedIn] = useState(token ?? false);

	const handleFetchUser = async () => {
		if (token) {
			const user = await fetchUser();
			setUser(user?.user);
		}
	};

	useEffect(() => {
		handleFetchUser();
	}, []);

	console.log(user);

	const { handleSubmit, register } = useForm<LoginFormInputs>();

	const handleLogin = async (data: LoginFormInputs) => {
		const { email, password } = data;
		await tryLogin(email, password, setLoggingIn);
		router.push('/');
	};

	return !loggedIn ? (
		<div className={styles.pageWrapper}>
			<form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
				<div className={styles.formTitle}>Login</div>
				<FormInput
					label="Email"
					placeholder="Email"
					{...register('email', { required: 'Email is required' })}
				/>
				<FormInput
					label="Password"
					placeholder="Password"
					type="password"
					{...register('password', { required: 'Password is required' })}
				/>
				<Button type="submit">{loggingIn ? 'Logging In...' : 'Iniciar Sessão'}</Button>
				<Link className={styles.lostPassword} href="/lost-password">
					Recuperar Password
				</Link>
			</form>

			<div className={styles.rightBlock}>
				<Image alt="" height={250} src={(account.logo as Media)?.url ?? '/placeholder.png'} width={565} />
				<div className={styles.blockTitle}>Ainda não tem conta SPG?</div>
				<div className={styles.description}>
					Usufrua das tecnologias que colocamos à sua disposição para consultar, discutir e partilhar documentos, vídeos e cursos científicos relacionados com a especialidade.
				</div>
				<div className={styles.description}>
					Se já é Sócio SPG, basta que nos envie os seus dados para que possamos confirmar e activar a sua conta. Se ainda não é Sócio SPG, preencha o formulário para formalizar a sua candidatura, que será submetida a aprovação em Assembleia Geral.
				</div>
				<div className={styles.buttons}>
					<Link href="/account/request">Já sou sócio SPG</Link>
					<Link href="/account/new">ainda não sou sócio SPG</Link>
				</div>
			</div>
		</div>
	) : (
		<div className={styles.pageWrapperLogged}>
			<div className={styles.leftBlock}>
				<Image alt="" height={700} src={(account.logo_logged as Media)?.url ?? '/placeholder.png'} width={560} />
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
						<Link href="/admin/collections/videos" target="_blank">Gerir vídeos</Link>
						<Link href="/admin/collections/users" target="_blank">Gerir utilizadores</Link>
						<Link href="/admin" target="_blank">Backoffice</Link>
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
	);
}
