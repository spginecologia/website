/* * */

import { getPayload } from 'payload'
import config from "@/payload.config"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/Section"
import EventFilters from "@/components/eventos/EventFilters"
import EventsList from "@/components/eventos/EventList"
import Image from "next/image"
import Link from "next/link"
import CategoriesSelect from "@/components/common/CategoriesSelect"

export default async function Page() {

    const payload = await getPayload({ config })
    const query = await payload.find({
        collection: "events",
        sort: "start_date",
        where: {
            start_date: {
                greater_than: new Date()
            }
        },
    })

    if (!query.docs.length) {
        notFound()
    }

    const events = query.docs.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())

    return (
        <>
            <Section>
                <Link href="/eventos-passados">
                    <Image src={"/placeholder.png"} alt="Eventos SPG" width={1000} height={1000} style={{ width: "100%", height: "auto", aspectRatio: "31/9" }} />
                </Link>
            </Section>
            <Section heading="Agenda">
                <EventFilters categoriesSelect={<CategoriesSelect />} />
                <EventsList events={events} />
            </Section>
        </>
    )
}