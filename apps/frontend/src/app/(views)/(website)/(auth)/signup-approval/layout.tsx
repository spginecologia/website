/* * */

import { AuthWrapper } from '@/components/auth/AuthWrapper';

/* * */

export default function Layout({ children }) {
	return (
		<AuthWrapper>
			{children}
		</AuthWrapper>
	);
}
