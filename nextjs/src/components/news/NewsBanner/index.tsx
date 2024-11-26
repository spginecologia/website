import { Card } from '@/components/common/card';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import config from '@/payload.config';
import { serializeLexical } from '@/payload/lexical/serializeLexical';
import { Media } from '@/payload-types';
import Image from 'next/image';
import { getPayload } from 'payload';
import reactNodeToString from 'react-node-to-string';

import styles from './styles.module.css';

export default async function NewsList() {
	const payload = await getPayload({ config });
	const newsList = await payload.find({
		collection: 'noticias',
		limit: 1,
		where: {
			is_featured: {
				equals: true,
			},
		},
	});

	const content = reactNodeToString(serializeLexical(newsList.docs?.[0].content));

	return (
		<Section>
			<Card className={styles.banner} direction="row" link={`/noticias/${newsList.docs?.[0].slug}`} variant="primary">
				<Grid columns="ab">
					<div className={styles.bannerImage}>
						<Image alt={newsList.docs?.[0].title} src={(newsList.docs?.[0].featured as Media)?.url ?? '/placeholder.png'} fill />
					</div>
					<div className={styles.bannerContent}>
						<h2 className={styles.bannerTitle}>{newsList.docs?.[0].title}</h2>
						<p className={styles.bannerDescription}>{content}</p>
						<span className={styles.bannerDate}>Publicado a {new Date(newsList.docs?.[0].createdAt).toLocaleDateString()}</span>
					</div>
				</Grid>
			</Card>
		</Section>
	);
}
