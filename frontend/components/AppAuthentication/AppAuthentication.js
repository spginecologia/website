'use client';

/* * */

import Section from '@/components/FrontendSection/FrontendSection';
import Loader from '@/components/Loader/Loader';
import Panel from '@/components/Panel/Panel';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import styles from './AppAuthentication.module.css';

/* * */

export default function AppAuthentication({ children }) {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const searchParams = useSearchParams();
	const { status } = useSession();

	//
	// B. Handle actions

	useEffect(() => {
		const checkAuthStatusInterval = setInterval(() => {
			if (status === 'authenticated') {
				const callbackUrl = searchParams.get('callbackUrl');
				if (callbackUrl) router.push(callbackUrl);
				else router.push('/');
			}
		}, 500);
		return () => clearInterval(checkAuthStatusInterval);
	}, [router, status, searchParams]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			{(status === 'loading' || status === 'authenticated') && <Loader fixed visible />}
			<Section first>
				<div className={styles.grid}>
					<Panel>{children}</Panel>
					<div className={styles.advert} />
				</div>
			</Section>
		</div>
	);

	//
}
