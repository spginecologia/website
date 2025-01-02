'use client';

/* * */

import type { DataFromGlobalSlug } from 'payload';

import { Section } from '@/components/common/Section';
import { SocietySocialBodiesMember } from '@/components/society/SocietySocialBodiesMember';
import { Image, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function SocietySocialBodies() {
	//

	//
	// A. Setup variables

	const t = useTranslations('society.SocietySocialBodies');

	//
	// B. Fetch data

	const { data: socialBodiesData } = useSWR<DataFromGlobalSlug<'social-bodies'>>('/api/globals/social-bodies');

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<Section>

				<Title order={1}>{t('title')}</Title>
				<Image src="/generic/orgaos-sociais-spg-2023.jpg" />

				<div className={styles.grid}>

					<div className={styles.column}>

						{socialBodiesData?.direction && (
							<div className={styles.orgGroup}>
								<Title className={styles.orgGroupTitle} order={2}>{t('org.direction.title')}</Title>
								{socialBodiesData.direction.map(memberData => (
									<SocietySocialBodiesMember
										key={memberData.id}
										city={memberData.city}
										name={memberData.name}
										photoSrc={typeof memberData.photo === 'object' ? memberData.photo?.url : null}
										position={memberData.position}
										separatedFromNext={memberData.separated_from_next}
									/>
								))}
							</div>
						)}

					</div>

					<div className={styles.column}>

						{socialBodiesData?.general_assembly && (
							<div className={styles.orgGroup}>
								<Title className={styles.orgGroupTitle} order={2}>{t('org.general_assembly.title')}</Title>
								{socialBodiesData.general_assembly.map(memberData => (
									<SocietySocialBodiesMember
										key={memberData.id}
										city={memberData.city}
										name={memberData.name}
										photoSrc={typeof memberData.photo === 'object' ? memberData.photo?.url : null}
										position={memberData.position}
									/>
								))}
							</div>
						)}

						{socialBodiesData?.fiscal_council && (
							<div className={styles.orgGroup}>
								<Title className={styles.orgGroupTitle} order={2}>{t('org.fiscal_council.title')}</Title>
								{socialBodiesData.fiscal_council.map(memberData => (
									<SocietySocialBodiesMember
										key={memberData.id}
										city={memberData.city}
										name={memberData.name}
										photoSrc={typeof memberData.photo === 'object' ? memberData.photo?.url : null}
										position={memberData.position}
									/>
								))}
							</div>
						)}

						{socialBodiesData?.consultive_council && (
							<div className={styles.orgGroup}>
								<Title className={styles.orgGroupTitle} order={2}>{t('org.consultive_council.title')}</Title>
								{socialBodiesData.consultive_council.map(memberData => (
									<SocietySocialBodiesMember
										key={memberData.id}
										city={memberData.city}
										name={memberData.name}
										photoSrc={typeof memberData.photo === 'object' ? memberData.photo?.url : null}
										position={memberData.position}
									/>
								))}
							</div>
						)}

					</div>

				</div>

			</Section>
		</div>
	);

	//
}
