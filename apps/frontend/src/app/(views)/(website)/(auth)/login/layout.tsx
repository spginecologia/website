/* * */

import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { SignupAd } from '@/components/signup/SignupAd';

/* * */

export default function Layout({ children }) {
	return (
		<AuthWrapper sidebar={<SignupAd />}>
			{children}
		</AuthWrapper>
	);
}
