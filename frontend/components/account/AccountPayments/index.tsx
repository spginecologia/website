'use client';

/* * */

// import { AccountSubscriptionInfoRenew } from '@/components/account/AccountSubscriptionInfoRenew';
// import { AccountSubscriptionInfoStatus } from '@/components/account/AccountSubscriptionInfoStatus';
// import { AccountSubscriptionManage } from '@/components/account/AccountSubscriptionManage';
// import { Loader } from '@/components/common/Loader';
import Panel from '@/components/Panel/Panel';
// import Text from '@/components/Text/Text';
// import Title from '@/components/Title/Title';
import { Button, Space, Text, Title } from '@mantine/core';
// import { loadStripe } from '@stripe/stripe-js';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import useSWR from 'swr';

import { AccountPaymentsPricesList } from '../AccountPaymentsPricesList';
import styles from './styles.module.css';

/* * */

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

/* * */

export function AccountPayments() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountSubscription');

	//
	// B. Fetch data

	const { data: pricesData, isLoading: pricesLoading } = useSWR('/api/account/payments/list-prices');

	//
	// B. Fetch data

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);
		if (query.get('success')) {
			console.log('Order placed! You will receive an email confirmation.');
		}
		if (query.get('canceled')) {
			console.log('Order canceled -- continue to shop around and checkout when you are ready.');
		}
	}, []);

	//
	// C. Render components

	return (
		<Panel>
			<Title order={2}>{t('title')}</Title>
			<Text>{t('subtitle')}</Text>
			<Space h="md" />
			<AccountPaymentsPricesList />
		</Panel>
	);

	//
}
