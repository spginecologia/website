import Button from "@/components/common/Button";
import Categories from "@/components/common/Categories";
import { Section } from "@/components/layout/Section";
import { Category } from "@/payload-types";
import { DateTime } from "luxon";
import { Event } from "@/payload-types";

import styles from './styles.module.css';
import { Grid } from "@/components/layout/Grid";
import { capitalizeDate } from "@/lib/utils";

export default function EventHeader({ event }: { event: Event }) {

    const keyLabels = {
        link_to_official_page: 'Página Oficial',
        link_to_register: 'Inscrever no Evento',
        link_to_program: 'Ver Programa',
        link_to_facebook: 'Ver no Facebook',
    }

    const start_date = DateTime.fromISO(event.start_date).setLocale('pt-PT');
    const end_date = DateTime.fromISO(event.end_date).setLocale('pt-PT');

    return (
        <Section paddingY={1} >
            <Grid columns="abcd">
                <div className={styles.dateCard}>
                    <span className={styles.dateCardDay}>{start_date.day.toString().length === 1 ? `0${start_date.day}` : start_date.day}</span>
                    <span className={styles.dateCardMonth}>{start_date.monthLong}</span>
                    <span className={styles.dateCardYear}>{start_date.year}</span>
                </div>
                <div className={styles.info}>
                    <Categories categories={event.categories as Category[]} />
                    <h1>{event.title}</h1>

                    <div className={styles.date}>
                        <div><strong>Início</strong>: {capitalizeDate(start_date.toFormat('cccc, d \'de\' MMMM \'de\' yyyy'))}</div>
                        <div><strong>Fim</strong>: {capitalizeDate(end_date.toFormat('cccc, d \'de\' MMMM \'de\' yyyy'))}</div>
                    </div>

                    <div>
                        {Object.entries(event.links_group ?? {}).map(([key, link]) => (link &&
                            <Button link={link} key={key}>{keyLabels[key as keyof typeof keyLabels]}</Button>
                        ))}
                    </div>
                </div>
            </Grid>
        </Section>
    );
}
