/* * */

import { AuthWrapper } from '@/components/auth/AuthWrapper';

/* * */

export default function Layout({ children }) {
	return (
		<AuthWrapper sidebar={<div />}>
			{children}
		</AuthWrapper>
	);
}
