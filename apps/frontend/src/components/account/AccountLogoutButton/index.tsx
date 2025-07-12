/* * */

import { type PayloadMeResponse } from '@/src/types/payload-api-response';
import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

/* * */

export function AccountLogoutButton() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountLogoutButton');

	//
	// B. Fetch data

	const { mutate: userMutate } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Handle actions

	const handleLogout = async () => {
		await fetch('/api/users/logout', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		userMutate();
	};

	//
	// D. Render components

	return (
		<div>
			<Button onClick={handleLogout}>{t('label')}</Button>
		</div>
	);

	//
}
