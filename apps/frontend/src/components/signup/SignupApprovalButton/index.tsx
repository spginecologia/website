'use client';

/* * */

import { SignupApprovalRequest } from '@/services/payload/collections/Signup/types';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

interface SignupApprovalButtonProps {
	decision: SignupApprovalRequest['decision']
	onClick?: (decision: SignupApprovalRequest['decision']) => void
}

/* * */

export function SignupApprovalButton({ decision, onClick }: SignupApprovalButtonProps) {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	if (decision === 'approve') {
		return (
			<div className={styles.container} onClick={() => onClick?.('approve')}>
				<IconCheck size={48} stroke={3} />
				{t('auth.SignupApproval.actions.approve')}
			</div>
		);
	}

	return (
		<div className={styles.container} onClick={() => onClick?.('reject')}>
			<IconX size={48} stroke={3} />
			{t('auth.SignupApproval.actions.reject')}
		</div>
	);

	//
}
