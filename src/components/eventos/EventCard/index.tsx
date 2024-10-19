/* * */

import { Card } from "@/components/common/card"
import { Category, Event, Media } from "@/payload-types"
import { DateTime } from "luxon";

import styles from "./styles.module.css"
import { Grid } from "@/components/layout/Grid";
import Categories from "@/components/common/Categories";
import { capitalizeDate } from "@/lib/utils";
/* * */

export default function EventCard({ event }: { event: Event }) {

    const start_date = DateTime.fromISO(event.start_date).setLocale('pt-PT');
    const end_date = DateTime.fromISO(event.end_date).setLocale('pt-PT');


    return (
        <Card variant="primary" image={{ src: (event.featured as Media)?.url ?? "/placeholder.png", alt: event.title, size: 200, objectFit: 'cover' }} className={styles.card} link={`/eventos/${event.slug}`}>
            <Grid columns="abcd" className={styles.cardContent}>
                <div className={styles.dateCard}>
                    <span className={styles.dateCardDay}>{start_date.day.toString().length === 1 ? `0${start_date.day}` : start_date.day}</span>
                    <span className={styles.dateCardMonth}>{start_date.monthLong}</span>
                    <span className={styles.dateCardYear}>{start_date.year}</span>
                </div>
                <div className={styles.info}>
                    <Categories categories={event.categories?.slice(0, 1) as Category[]} />
                    <h2>{event.title}</h2>
                    <div className={styles.date}>
                        <div><strong>Início</strong>: {capitalizeDate(start_date.toFormat('cccc, d \'de\' MMMM \'de\' yyyy'))}</div>
                        <div><strong>Fim</strong>: {capitalizeDate(end_date.toFormat('cccc, d \'de\' MMMM \'de\' yyyy'))}</div>
                    </div>
                </div>
            </Grid>
        </Card>
    )
}
