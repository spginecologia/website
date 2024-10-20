/* * */

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { notFound } from "next/navigation"
import EventCard from "@/components/eventos/EventCard"
import { Section } from "@/components/layout/Section"
import { Grid } from "@/components/layout/Grid"
import EventFilters from "@/components/eventos/EventFilters"
import CategoriesSelect from "@/components/common/CategoriesSelect"


export default async function Page() {

    const payload = await getPayloadHMR({ config })
    const query = await payload.find({
        collection: "events",
        where: {
            start_date: {
                less_than: new Date()
            }
        },
    })

    if (!query.docs.length) {
        notFound()
    }

    const events = query.docs.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())

    return (
        <>
            <Section heading="Eventos Passados">
                <EventFilters categoriesSelect={<CategoriesSelect />} />
                <Grid columns="ab" gap="lg">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </Grid>
            </Section>
        </>
    )
}