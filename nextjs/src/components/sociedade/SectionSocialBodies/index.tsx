import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import classNames from 'classnames';
import Image from 'next/image';

import styles from './styles.module.css';
import { Member } from '@/payload-types';
import { getPayload } from 'payload';
import config from '@/payload.config';
import MemberCard from '@/components/common/MemberCard';
import { Assets } from '@/lib/assets';

export default async function Component() {

	const payload = await getPayload({ config })
	const socialBodies = await payload.find({
		collection: "members",
		limit: 1000,
	})

	const directors_order = ["presidente", "secretário geral", "tesoureira", "vice-presidente", "vogal"]

	const directors = socialBodies.docs.filter((member: Member) => member.social_body === "direcao")
		.sort((a: Member, b: Member) =>
			directors_order.indexOf(a.position?.toLowerCase() as string)
			- directors_order.indexOf(b.position?.toLowerCase() as string)
		)
	const generalAssembly = socialBodies.docs.filter((member: Member) => member.social_body === "assembleia-geral")
	const fiscalCouncil = socialBodies.docs.filter((member: Member) => member.social_body === "conselho-fiscal")
	const advisory = socialBodies.docs.filter((member: Member) => member.social_body === "conselho-consultivo")

	return (
		<Section heading="Órgãos Sociais" variant="secondary">
			<Image
				alt="Foto de grupo dos Orgãos Sociais"
				height={0}
				sizes="100vw"
				src={Assets.SOCIETY_BANNER ?? "/placeholder.png"}
				style={{ height: 'auto', width: '100%' }}
				width={0}
			/>
			<Grid columns="ab" gap="md">
				<div className={styles.bodyGroup}>
					<h2>Direção</h2>
					{directors.map((member, index) => (
						<div key={index} className={styles.positionGroup} aria-label={member.position as string}>
							<MemberCard member={member} />
						</div>
					))}
				</div>
				<div className={styles.bodyGroupWrapper}>
					<div className={classNames(styles.bodyGroup)}>
						<h2>Assembeleia Geral</h2>
						{generalAssembly.map((member, index) => (
							<MemberCard key={index} member={member} />
						))}
					</div>
					<div className={classNames(styles.bodyGroup)}>
						<h2>Conselho Fiscal</h2>
						{fiscalCouncil.map((member, index) => (
							<MemberCard key={index} member={member} />
						))}
					</div>
					<div className={classNames(styles.bodyGroup)}>
						<h2>Conselho Consultivo</h2>
						{advisory.map((member, index) => (
							<MemberCard key={index} member={member} />
						))}
					</div>
				</div>
			</Grid>
		</Section >
	);
}
