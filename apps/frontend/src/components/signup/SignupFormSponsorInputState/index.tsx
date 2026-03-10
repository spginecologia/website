'use client';

/* * */

import { Loader } from '@mantine/core';
import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';

/* * */

interface SignupFormSponsorInputStateProps {
	isLoading?: boolean | null
	isValid?: boolean | null
}

/* * */

export function SignupFormSponsorInputState({ isLoading, isValid }: SignupFormSponsorInputStateProps) {
	//

	if (isLoading) {
		return <Loader size="xs" />;
	}

	if (isValid) {
		return (
			<IconCircleCheckFilled
				color="var(--color-state-success)"
				size={18}
			/>
		);
	}

	return (
		<IconCircleXFilled
			color="var(--color-state-error)"
			size={18}
		/>
	);

	//
}
