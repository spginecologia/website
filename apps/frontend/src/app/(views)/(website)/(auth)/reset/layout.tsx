/* * */

import { AuthWrapper } from '@/src/components/auth/AuthWrapper';

/* * */

export default function Layout({ children }) {
	return <AuthWrapper>{children}</AuthWrapper>;
}
