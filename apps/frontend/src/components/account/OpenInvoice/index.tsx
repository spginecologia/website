/* * */

import { IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	docId?: null | string
}

/* * */

export function OpenInvoice({ docId }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.OpenInvoice');

	//
	// B. Render components

	if (!docId) {
		return <span>-</span>;
	}

	return (
		<a className={styles.link} href={`/api/account/payments/get-transaction-pdf/${docId}`} target="_blank">
			{t('label')}
			<IconExternalLink size={14} />
		</a>
	);

	//
}
