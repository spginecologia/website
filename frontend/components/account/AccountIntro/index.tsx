/* * */

import { PayloadMeResponse } from '@/types/payload-api-response';
import { Paper, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

/* * */

export function AccountIntro() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountIntro');

	//
	// B. Fetch data

	const { data: userData } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Render components

	return (
		<Paper>
			<Title order={2}>{t('title', { name: userData?.user.name })}</Title>
			<Text>{t('subtitle')}</Text>
		</Paper>
	);

	//
}
