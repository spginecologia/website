/* * */

import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { Footer } from '@/components/footer/Footer';

/* * */

export default function Layout({ children }) {
	return (
		<>
			<AuthWrapper>
				{children}
			</AuthWrapper>
			<Footer />
		</>
	);
}
