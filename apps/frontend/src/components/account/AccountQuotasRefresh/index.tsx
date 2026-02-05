'use client';

/* * */

import { type PayloadMeResponse } from '@/types/payload-api-response';
import { Text } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

/* * */

export function AccountQuotasRefresh() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Fetch data

	const { data: userData } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Render components

	if (!userData?.user?.id) {
		return null;
	}

	return (
		<Link href={`/api/account/quotas/refresh-status/${userData.user.id}`}>
			<Text maw={400} variant="footnote">{t('account.AccountQuotasRefresh.footnote')}</Text>
		</Link>
	);

	//
}
