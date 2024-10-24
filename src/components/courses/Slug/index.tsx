/* * */

import { Event, Media } from '@/payload-types';
import EventSections from '../EventSection';
import Image from 'next/image';
/* * */

import styles from './styles.module.css';
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
