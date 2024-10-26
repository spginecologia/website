import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@/payload.config";

import NewsSection from "@/components/news/NewsList";
import SectionMission from "@/components/sociedade/SectionMission";
import EventsList from "@/components/eventos/EventList";
import { Section } from "@/components/layout/Section";
import SectionCards from "@/components/seccoes/SectionCards";
import ConsensoList from "@/components/consensos/ConsensosList";
import AcademySection from "@/components/Academy/AcademySection";

export default async function Page() {

    const payload = await getPayloadHMR({ config })
    const newsList = await payload.find({
        collection: "noticias",
        pagination: true,
        limit: 3,
        sort: "-createdAt",
    })

    const eventsList = await payload.find({
        collection: "events",
        limit: 2,
        sort: "start_date",
        where: {
            start_date: {
                greater_than: new Date()
            }
        },
    })

    const consensos = await payload.find({
        collection: "consensos",
        sort: "createdAt",
        limit: 4
    })

    return (
        <>
            <NewsSection news={newsList.docs} />
            <SectionMission />
            <Section heading="Agenda">
                <EventsList events={eventsList.docs} />
            </Section>
            <Section heading="Secções" variant="secondary">
                <SectionCards />
            </Section>
            <AcademySection />
            <Section heading="Consensos">
                <ConsensoList consensos={consensos.docs} />
            </Section>
        </>
    )
}
