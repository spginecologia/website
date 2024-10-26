import EventsList from "@/components/eventos/EventList"
import { Section } from "@/components/layout/Section"

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"

export default async function HomeEventSection() {
    const payload = await getPayloadHMR({ config })
    const eventsList = await payload.find({
        collection: "events",
        limit: 2,
        sort: "start_date",
    })

    return <Section heading="Agenda">
        <EventsList events={eventsList.docs} />
    </Section>
}