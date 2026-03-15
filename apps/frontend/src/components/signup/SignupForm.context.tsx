'use client';

/* * */

import { SignupFormDefault } from '@/services/payload/collections/Signup/default';
import { SignupResponse } from '@/services/payload/collections/Signup/types';
import { SignupForm, SignupFormValidation } from '@/services/payload/collections/Signup/validation';
import { useForm, UseFormReturnType } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

/* * */

interface SignupFormContextState {
	actions: {
		signup: () => void
	}
	data: {
		form: UseFormReturnType<SignupForm>
		signup_response: null | SignupResponse
	}
	flags: {
		is_error: boolean
		is_loading: boolean
	}
}

/* * */

const SignupFormContext = createContext<SignupFormContextState | undefined>(undefined);

export function useSignupFormContext() {
	const context = useContext(SignupFormContext);
	if (!context) {
		throw new Error('useSignupFormContext must be used within a SignupFormContextProvider');
	}
	return context;
}

/* * */

export const SignupFormContextProvider = ({ children }: PropsWithChildren) => {
	//

	//
	// A. Setup variables

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const [signupResponse, setSignupResponse] = useState<null | SignupResponse>(null);

	//
	// C. Setup form

	const form = useForm<SignupForm>({
		// clearInputErrorOnChange: true,
		initialValues: SignupFormDefault,
		onValuesChange: () => {
			setIsError(false);
			const validationResult = form.validate();
			console.log('Form validation result:', validationResult);
		},
		validate: zod4Resolver(SignupFormValidation),
		validateInputOnChange: true,
	});

	//
	// D. Handle actions

	useEffect(() => {
		// Get pre-filled values from URL query params
		const params = new URLSearchParams(window.location.search);
		const email = params.get('email');
		const taxId = params.get('tax_id');
		if (email) form.setFieldValue('email', email);
		if (taxId) form.setFieldValue('tax_id', taxId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const signup = async () => {
		try {
			setIsLoading(true);
			setIsError(false);
			setSignupResponse(null);
			const response = await fetch('/api/auth/signup', {
				body: JSON.stringify(form.getValues()),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			if (!response.ok) throw new Error(`Failed to Check. Status: ${response.status}`);
			const responseData = await response.json();
			setIsLoading(false);
			setSignupResponse(responseData);
		} catch (error) {
			console.log(error.message);
			setIsLoading(false);
			setIsError(true);
		}
	};

	//
	// E. Define context value

	const contextValue: SignupFormContextState = {
		actions: {
			signup,
		},
		data: {
			form,
			signup_response: signupResponse,
		},
		flags: {
			is_error: isError,
			is_loading: isLoading,
		},
	};

	//
	// F. Render components

	return (
		<SignupFormContext.Provider value={contextValue}>
			{children}
		</SignupFormContext.Provider>
	);

	//
};
