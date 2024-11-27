/* * */

import { AccountMain } from '@/components/account/AccountMain';

/* * */

export default function Layout({ profile, subscription, videos }) {
	return (
		<AccountMain>
			{profile}
			{subscription}
			{videos}
		</AccountMain>
	);
}
