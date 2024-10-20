/* * */

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/Section"
import EventFilters from "@/components/eventos/EventFilters"
import CategoriesSelect from "@/components/common/CategoriesSelect"
import EventList from "@/components/eventos/EventList"


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
                <EventList events={events} />
            </Section>
        </>
    )
}