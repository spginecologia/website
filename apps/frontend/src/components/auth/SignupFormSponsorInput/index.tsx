'use client';

/* * */

import { validateTaxId } from '@/services/general/validate-tax-id';
import { Loader, TextInput } from '@mantine/core';
import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/* * */

interface SignupFormSponsorInputProps {
	onChange?: (value: string) => void
	onValidate?: (value: boolean) => void
	value: string
}

/* * */

export function SignupFormSponsorInput({ onChange, onValidate, value }: SignupFormSponsorInputProps) {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const [isLoading, setIsLoading] = useState(false);
	const [isValid, setIsValid] = useState<boolean | null>(null);

	//
	// B. Handle actions

	const setIsValidAndNotify = useCallback((value: boolean) => {
		setIsValid(value);
		setIsLoading(false);
		if (onValidate) onValidate(value);
	}, [onValidate]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			// Perform a basic Tax ID validation
			const isValidTaxId = validateTaxId(value, false, ['singular']);
			if (!isValidTaxId) return setIsValidAndNotify(false);
			// If it passes the basic validation,
			// then we can proceed to check if it's valid on the backend.
			const response = await fetch('/api/auth/sponsor-check', {
				body: JSON.stringify({ tax_id: value }),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			// If the response is not ok,
			// then the sponsor is not valid.
			if (!response.ok) return setIsValidAndNotify(false);
			// If the response is ok, then check the response data
			const responseData = await response.json();
			setIsValidAndNotify(responseData.is_valid);
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	//
	// C. Render components

	return (
		<TextInput
			label={t('auth.SignupForm.fields.sponsor_tax_id.label')}
			onChange={e => onChange?.(e.currentTarget.value)}
			placeholder={t('auth.SignupForm.fields.sponsor_tax_id.placeholder')}
			value={value}
			rightSection={isLoading
				? <Loader size="xs" />
				: isValid === null ? null
					: isValid ? <IconCircleCheckFilled color="green" size={18} />
						: <IconCircleXFilled color="red" size={18} />}
		/>
	);

	//
}
