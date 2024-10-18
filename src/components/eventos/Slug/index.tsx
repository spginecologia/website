/* * */

import { Category, Event, Media } from '@/payload-types';
import EventSections from '../EventSection';
import { Section } from '@/components/layout/Section';
import Image from 'next/image';
import { DateTime } from 'luxon';
/* * */

import styles from './styles.module.css';
import Categories from '@/components/common/Categories';
import Button from '@/components/common/Button';
import EventHeader from '../EventHeader';

export default function Component({ event }: { event: Event }) {

    return (
        <>
            <section className={styles.imageContainer}>
                <Image src={(event.featured as Media)?.url ?? '/placeholder.png'} alt={event.title} fill />
            </section>
            <EventHeader event={event} />
            <EventSections sections={event.sections} />
        </>
    );
}
