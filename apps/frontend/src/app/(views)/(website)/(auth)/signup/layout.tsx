/* * */

import { AuthWrapper } from '@/src/components/auth/AuthWrapper';
import { SignupGuide } from '@/src/components/auth/SignupGuide';

/* * */

export default function Layout({ children }) {
	return (
		<AuthWrapper sidebar={<SignupGuide />}>
			{children}
		</AuthWrapper>
	);
}
