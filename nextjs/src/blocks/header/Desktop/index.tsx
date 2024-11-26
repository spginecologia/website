'use client';

import { fetchUser } from '@/functions/fetchUser';
import { Header, Media, User } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import nookies from 'nookies';
import { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

import styles from './styles.module.css';

export default function Desktop({ header }: { header: Header }) {
	const [isHovered, setIsHovered] = useState(false);

	const cookies = nookies.get();
	const token = cookies.authToken;

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

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<Link href="/">
					<Image
						alt={(header.logo as Media)?.alt ?? ''}
						height={40}
						src={(header.logo as Media)?.url ?? '/placeholder.png'}
						width={120}
					/>
				</Link>
			</div>
			<div className={styles.links}>
				{header.navigationItems?.map(item => (
					<Link key={item.label} href={`/${item.url}`}>
						{item.label}
					</Link>
				))}
				<Link className={styles.search} href="/academia/topicos/">
					<IoSearchSharp size={20} />
				</Link>
			</div>
			<div className={styles.academyWrapper}>
				<div
					className={styles.dropdownAcademy}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<Image
						alt={(header.academiaDropdownLogo as Media)?.alt ?? ''}
						height={19}
						src={(header.academiaDropdownLogo as Media)?.url ?? '/placeholder.png'}
						width={190}
					/>
					<div
						className={`${styles.dropdownContent} ${isHovered ? styles.visible : styles.hidden}`}
					>
						{header.academyDropdownMenu?.map(item => (
							<Link key={item.id} className={styles.dropdownItem} href={`/${item.url}`}>
								<Image
									alt={(item.logo as Media)?.alt ?? ''}
									height={30}
									src={(item.logo as Media)?.url ?? '/placeholder.png'}
									width={30}
								/>
								<span>{item.label}</span>
							</Link>
						))}
					</div>
				</div>
				<div className={styles.login}>
					<Link href="/account">{!loggedIn ? 'Login' : `${user?.title} ${user?.name}`}</Link>
				</div>
			</div>
		</div>
	);
}
