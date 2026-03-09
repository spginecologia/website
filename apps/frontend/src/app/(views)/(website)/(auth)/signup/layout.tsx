/* * */

import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { SignupGuide } from '@/components/signup/SignupGuide';

/* * */

export default function Layout({ children }) {
	return (
		<AuthWrapper sidebar={<SignupGuide />}>
			{children}
		</AuthWrapper>
	);
}
