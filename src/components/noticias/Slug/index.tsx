/* * */

import RichText from '@/components/common/RichText';
import { Section } from '@/components/layout/Section';
import { Media, Noticia } from '@/payload-types';
import Image from 'next/image';

/* * */

import styles from './styles.module.css';

export default function Component({ item }: { item: Noticia }) {
    return (
        <>
            <div className={styles.imageContainer}>
                <Image src={(item.featured as Media)?.url ?? '/placeholder.png'} alt={item.title} fill />
            </div>
            <Section>
                <div className={styles.container}>
                    <h1 className={styles.title}>{item.title}</h1>
                    <span className={styles.date}>Publicado a {new Date(item.createdAt).toLocaleDateString('pt-PT')}</span>
                    <RichText content={item.content} />
                </div>
            </Section>
        </>
    );
}
