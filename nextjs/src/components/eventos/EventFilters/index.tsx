"use client"

import TextInput from "@/components/common/TextInput"
import { SearchIcon } from "lucide-react"
import { Grid } from "@/components/layout/Grid"
import Select from "@/components/common/Select"
import DateRange from "@/components/common/DateRange"
import { useQueryState, createParser } from "nuqs"
import { DatesRangeValue } from "@mantine/dates"
import { useEffect, useState } from "react"
import { DateTime } from "luxon"


export default function EventFilters({ categoriesSelect }: { categoriesSelect: React.ReactNode }) {
    const eventTypes = [
        {
            label: "Eventos SPG",
            value: "spg",
        }, {
            label: "Eventos Patrocinados",
            value: "patrocinado",
        }, {
            label: "Outros",
            value: "outros",
        }
    ]

    const createDateRangeParser = createParser({
        parse: (value: string) => {
            const start_date = value.split('&')[0].split('=')[1]
            const end_date = value.split('&')[1].split('=')[1]
            return [DateTime.fromISO(start_date).toJSDate(), DateTime.fromISO(end_date).toJSDate()] as DatesRangeValue
        },
        serialize: (value: DatesRangeValue | undefined) => `start_date=${value?.[0]?.toISOString()}&end_date=${value?.[1]?.toISOString()}`
    })

    const [search, setSearch] = useQueryState('search', { defaultValue: '' })
    const [dateRangeQuery, setDateRangeQuery] = useQueryState('dateRange', createDateRangeParser)
    const [eventTypeQuery, setEventTypeQuery] = useQueryState('eventType', { defaultValue: '' })

    return <Grid columns="ab" gap="sm">
        <TextInput placeholder={"Procurar..."} leftSection={<SearchIcon />} value={search} onChange={(e) => setSearch(e.target.value)} />
        <DateRange value={dateRangeQuery ?? undefined} onChange={(value) => setDateRangeQuery(value!)} />
        {categoriesSelect}
        <Select data={eventTypes} placeholder="Todos tipos de Evento" value={eventTypeQuery} onChange={(value) => setEventTypeQuery(value!)} />
    </Grid>
}