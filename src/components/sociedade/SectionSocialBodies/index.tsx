import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import classNames from 'classnames';
import Image from 'next/image';

import SocialBodyProfile from '../SocialBodyProfile';
import styles from './styles.module.css';

export default function Component() {
	return (
		<Section heading="Órgãos Sociais" variant="secondary">
			<Image
				alt="Foto de grupo dos Orgãos Sociais"
				height={0}
				sizes="100vw"
				src={Assets.SOCIETY_BANNER}
				style={{ height: 'auto', width: '100%' }}
				width={0}
			/>
			<Grid columns="ab" withGap>
				<div className={styles.bodyGroup}>
					<h2>Direção</h2>
					{direction.map((memberLevel, index) => (
						<div key={index} className={styles.memberLevel}>
							{memberLevel.map((member, index) => (
								<SocialBodyProfile key={index} member={member} />
							))}
						</div>
					))}
				</div>
				<div>
					<div className={classNames(styles.bodyGroup, styles.memberLevel)}>
						<h2>Assembeleia Geral</h2>
						{generalAssembly.map((member, index) => (
							<SocialBodyProfile key={index} member={member} />
						))}
					</div>
					<div className={classNames(styles.bodyGroup, styles.memberLevel)}>
						<h2>Conselho Fiscal</h2>
						{fiscalCouncil.map((member, index) => (
							<SocialBodyProfile key={index} member={member} />
						))}
					</div>
					<div className={classNames(styles.bodyGroup, styles.memberLevel)}>
						<h2>Conselho Consultivo</h2>
						{advisory.map((member, index) => (
							<SocialBodyProfile key={index} member={member} />
						))}
					</div>
				</div>
			</Grid>
		</Section>
	);
}
