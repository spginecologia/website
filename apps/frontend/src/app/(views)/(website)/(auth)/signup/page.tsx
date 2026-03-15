/* * */

import { SignupForm } from '@/components/signup/SignupForm';
import { SignupFormContextProvider } from '@/components/signup/SignupForm.context';

/* * */

export default function Page() {
	return (
		<SignupFormContextProvider>
			<SignupForm />
		</SignupFormContextProvider>
	);
}
