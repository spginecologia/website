/* * */

import { Category, Course, Media } from '@/payload-types';
import Image from 'next/image';
/* * */

import styles from './styles.module.css';
import RichText from '@/components/common/RichText';
import { Section } from '@/components/layout/Section';
import Categories from '@/components/common/Categories';

export default function Component({ course }: { course: Course }) {

    return (
        <>
            <section className={styles.imageContainer}>
                <Image src={(course.featured as Media)?.url ?? '/placeholder.png'} alt={course.title} fill />
            </section>
            <Section>
                <Categories categories={course.categories as Category[]} />
                <h1>{course.title}</h1>
                <RichText content={course.description} />
            </Section>
        </>
    );
}
