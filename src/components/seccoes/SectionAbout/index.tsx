/* * */

import { Card, CardContent } from '@/components/common/card';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Section as SectionItem } from '@/payload-types';

import styles from './styles.module.css';
import RichText from '@/components/common/RichText';

/* * */

export default function Component({ section }: { section: SectionItem }) {
	return (
		<>
			<Section variant="primary">
				<Card
					className={styles.card}
					image={{
						alt: 'Imagem da seccção Endoscopia Ginecológica - SPEG',
						size: 240,
						src: '/placeholder.png',
					}}
				>
					<CardContent>
						<h2>Melhorar a qualidade de vida em todas as fases da vida da mulher</h2>
					</CardContent>
				</Card>
				<Grid columns="ab" withGap>
					<div>
						<h2>{section.first_column.title}</h2>
						<br />
						<RichText content={section.first_column.message} />
					</div>
					<div>
						<h2>{section.second_column.title}</h2>
						<br />
						<RichText content={section.second_column.message} />
					</div>
				</Grid>
			</Section>
		</>
	);
}
