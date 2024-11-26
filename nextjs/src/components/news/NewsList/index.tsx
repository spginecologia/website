import { Card, CardDescription, CardFooter, CardHeader } from '@/components/common/card';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { serializeLexical } from '@/payload/lexical/serializeLexical';
import { Media, Noticia } from '@/payload-types';
import reactNodeToString from 'react-node-to-string';

import styles from './styles.module.css';

export default async function NewsList({ news }: { news: Noticia[] }) {
	return (
		<Section heading="Notícias">
			<Grid align="center" columns="abc" gap="lg">
				{news?.map(item => (
					<Card key={item.id} className={styles.card} image={{ alt: item.title, objectFit: 'cover', size: 300, src: (item.featured as Media)?.url ?? '/placeholder.png' }} link={`/noticias/${item.slug}`}>
						<div className={styles.cardContent}>
							<CardHeader variant="primary">{item.title}</CardHeader>
							<div className={styles.cardDescription}>
								<CardDescription>{reactNodeToString(serializeLexical(item.content))}</CardDescription>
								<CardFooter>Publicado a {new Date(item.createdAt).toLocaleDateString()}</CardFooter>
							</div>
						</div>
					</Card>
				))}
			</Grid>
		</Section>
	);
}
