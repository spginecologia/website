import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"

import { Section } from "@/components/layout/Section"
import ConsensoList from "@/components/consensos/ConsensosList"

export default async function HomeConsensosSection() {
    const payload = await getPayloadHMR({ config })
    const consensos = await payload.find({
        collection: "consensos",
        sort: "createdAt",
        limit: 4
    })

    return <Section heading="Consensos">
        <ConsensoList consensos={consensos.docs} />
    </Section>
}