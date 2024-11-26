/* * */

import Categories from '@/components/common/Categories';
import RichText from '@/components/common/RichText';
import { Section } from '@/components/layout/Section';
import { Category, Media, Noticia } from '@/payload-types';
import Image from 'next/image';

import styles from './styles.module.css';

export default function Component({ item }: { item: Noticia }) {
	return (
		<>
			<div className={styles.imageContainer}>
				<Image alt={item.title} src={(item.featured as Media)?.url ?? '/placeholder.png'} fill />
			</div>
			<Section>
				<div className={styles.container}>
					<Categories categories={item.categories as Category[]} />
					<h1 className={styles.title}>{item.title}</h1>
					<span className={styles.date}>Publicado a {new Date(item.createdAt).toLocaleDateString('pt-PT')}</span>
					<RichText content={item.content} />
				</div>
			</Section>
		</>
	);
}
