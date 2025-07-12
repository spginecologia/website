/* * */

import { AuthWrapper } from '@/src/components/auth/AuthWrapper';
import { SignupAd } from '@/src/components/auth/SignupAd';

/* * */

export default function Layout({ children }) {
	return (
		<AuthWrapper sidebar={<SignupAd />}>
			{children}
		</AuthWrapper>
	);
}
