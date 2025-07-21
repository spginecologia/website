'use client';

/* * */

import { type PayloadMeResponse } from '@/types/payload-api-response';
import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import useSWR from 'swr';

/* * */

export function AccountQuotasRefresh() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountQuotasRefresh');

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
			<Text maw={400} variant="footnote">{t('footnote')}</Text>
		</Link>
	);

	//
}
