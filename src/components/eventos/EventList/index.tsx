"use client"

import { Grid } from "@/components/layout/Grid";
import EventCard from "../EventCard";
import { Category, Event } from "@/payload-types";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { DatesRangeValue } from "@mantine/dates";
import { DateTime } from "luxon";
import { useMemo } from "react";

export default function EventsList({ events }: { events: Event[] }) {

    const [categories] = useQueryState<string[]>("category", parseAsArrayOf(parseAsString, ';'))
    const [eventType] = useQueryState<string>("eventType", parseAsString)
    const [search] = useQueryState<string>("search", parseAsString)
    const [dateRange] = useQueryState<DatesRangeValue>("dateRange", {
        parse(value) {
            const start_date = value.split('&')[0].split('=')[1]
            const end_date = value.split('&')[1].split('=')[1]
            return [DateTime.fromISO(start_date).toJSDate(), DateTime.fromISO(end_date).toJSDate()] as DatesRangeValue
        },
    })

    const filteredEvents = useMemo(() => {
        let myEvents = events;

        if (categories?.length) {
            myEvents = myEvents.filter((event) => event.categories?.some((category) => categories.includes((category as Category).slug)))
        }

        if (eventType) {
            myEvents = myEvents.filter((event) => event.event_type === eventType)
        }

        if (search) {
            myEvents = myEvents.filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
        }

        if (dateRange && dateRange[0] && dateRange[1]) {
            myEvents = myEvents.filter((event) => {
                const eventDate = DateTime.fromISO(event.start_date).toJSDate();
                return eventDate >= dateRange![0]! && eventDate <= dateRange![1]!;
            });
        }

        return myEvents
    }, [events, categories, eventType, search, dateRange])

    return <Grid columns="ab" gap="lg">
        {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
        ))}
    </Grid>
}