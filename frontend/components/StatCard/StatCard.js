import { CopyButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';

import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import styles from './StatCard.module.css';

/* */

export default function StatCard({ link, title, type = 'copy', value }) {
	//

	let isLoading = true;

	if (!value && value != 0) {
		return <Loader visible />;
	}

	const CopyCard = () => (
		<CopyButton value={value}>
			{({ copied, copy }) => (
				<div className={styles.container} onClick={copy}>
					<div className={styles.wrapper}>
						<Text size="h4">{copied ? 'Value Copied' : title}</Text>
						<div className={styles.value}>{value}</div>
					</div>
				</div>
			)}
		</CopyButton>
	);

	const LinkCard = () => (
		<Link href={link} target="_blank">
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<Text size="h4">{title}</Text>
					<div className={styles.value}>{value}</div>
				</div>
				<IconChevronRight className={styles.chevron} />
			</div>
		</Link>
	);

	switch (type) {
		case 'link':
			return <LinkCard />;
		case 'copy':
		default:
			return <CopyCard />;
	}

	//
}
