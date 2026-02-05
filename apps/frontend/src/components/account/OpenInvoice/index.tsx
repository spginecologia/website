/* * */

import { IconExternalLink } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

interface Props {
	docId?: null | number
}

/* * */

export function OpenInvoice({ docId }: Props) {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	if (!docId) {
		return <span>-</span>;
	}

	return (
		<a className={styles.link} href={`/api/account/quotas/get-invoice-pdf/${docId}`} target="_blank">
			{t('account.OpenInvoice.label')}
			<IconExternalLink size={14} />
		</a>
	);

	//
}
