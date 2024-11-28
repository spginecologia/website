/* * */

import { AccountMain } from '@/components/account/AccountMain';

/* * */

export default function Layout({ payments, profile, videos }) {
	return (
		<AccountMain>
			{/* {profile} */}
			{payments}
			{/* {videos} */}
		</AccountMain>
	);
}
