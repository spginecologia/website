'use client';

/* * */

import type { DataFromGlobalSlug } from 'payload';

import { Section } from '@/components/common/Section';
import { Button } from '@mantine/core';
import Link from 'next/link';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function SocietyLegalDocuments() {
	//

	//
	// A. Fetch data

	const { data: legalDocumentsData } = useSWR<DataFromGlobalSlug<'legal-documents'>>('/api/globals/legal-documents');

	//
	// B. Transform data

	const getHref = (legalDocData) => {
		if (legalDocData.content_type === 'file') {
			return typeof legalDocData.document === 'object' && legalDocData.document.url ? legalDocData.document.url : '';
		}
		else if (legalDocData.content_type === 'link') {
			return legalDocData.link;
		}
		return '';
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<Section withPadding>
				<div className={styles.flex}>
					{legalDocumentsData?.docs?.map(legalDocData => (
						<Button
							key={legalDocData.id}
							component={Link}
							href={getHref(legalDocData)}
							target="_blank"
						>
							{legalDocData.title}
						</Button>
					))}
				</div>
			</Section>
		</div>
	);

	//
}
