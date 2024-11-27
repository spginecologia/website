'use client';

/* * */

import { AccountSubscriptionInfoRenew } from '@/components/account/AccountSubscriptionInfoRenew';
import { AccountSubscriptionInfoStatus } from '@/components/account/AccountSubscriptionInfoStatus';
import { AccountSubscriptionManage } from '@/components/account/AccountSubscriptionManage';
import { Loader } from '@/components/common/Loader';
import Panel from '@/components/Panel/Panel';
import Text from '@/components/Text/Text';
import Title from '@/components/Title/Title';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountSubscription() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountSubscription');

	//
	// B. Fetch data

	const { data: subscriptionData, isLoading: subscriptionLoading } = useSWR('/api/account/subscription');

	//
	// C. Render components

	return (
		<Panel>
			<div className={styles.container}>
				<Title level="h2" text={t('title')} />
				<Text text={t('subtitle')} />
				<div className={styles.actions}>
					{subscriptionLoading && !subscriptionData && <Loader size={20} visible />}
					{!subscriptionLoading && subscriptionData && (
						<>
							<AccountSubscriptionInfoStatus status={subscriptionData.status} />
							<AccountSubscriptionInfoRenew canceledAt={subscriptionData.canceled_at} currentPeriodEnd={subscriptionData.current_period_end} status={subscriptionData.status} />
							<AccountSubscriptionManage status={subscriptionData.status} />
						</>
					)}
				</div>
			</div>
		</Panel>
	);

	//
}
