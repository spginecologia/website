'use client';

/* * */

import { type PayloadMeResponse } from '@/types/payload-api-response';
import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

/* * */

export function AccountLogoutButton() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

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
			<Button onClick={handleLogout}>{t('account.AccountLogoutButton.label')}</Button>
		</div>
	);

	//
}
