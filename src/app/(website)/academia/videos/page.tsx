import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { Section } from "@/components/layout/Section"
import { Grid } from "@/components/layout/Grid"
import { VideoCard } from "@/components/videos/VideoCard"
import Banner from "@/components/common/Banner"
import { VideoTitle } from "@/components/videos/Title"

export default async function Page() {

    const payload = await getPayloadHMR({ config });
    const query = await payload.find({
        collection: "videos",
        limit: 100,
    });

    const videosPage = await payload.findGlobal({
		slug: 'videosPage',
	})

    return (
        <>
            <Banner videosPage={videosPage} />
            <Section>
                <Grid columns="abc" gap="md">
                    {query.docs.filter((item) => item.video_featured === true).map((video) => (
                        <VideoCard small={true} variant="primary" video={video} key={video.id} />
                    ))}
                </Grid>
                <VideoTitle>Vídeos Cirúrgicos</VideoTitle>
                <Grid columns="abc" gap="md">
                    {query.docs.map((video) => (
                        <VideoCard small={false} variant="transparent" video={video} key={video.id} />
                    ))}
                </Grid>
            </Section>
        </>
    )
}
