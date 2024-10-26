import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { Section } from "@/components/layout/Section"
import { Grid } from "@/components/layout/Grid"
import { VideoCard } from "@/components/videos/VideoCard"

export default async function Page() {

    const payload = await getPayloadHMR({ config })
    const query = await payload.find({
        collection: "videos",
    })


    return <Section>
        <h1>Videos</h1>
        <Grid columns="abc" gap="md">
            {query.docs.map((video) => (
                <VideoCard video={video} key={video.id} />
            ))}
        </Grid>
    </Section>
}
