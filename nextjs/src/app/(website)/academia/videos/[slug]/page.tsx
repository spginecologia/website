/* * */

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { notFound } from "next/navigation"
import PageComponent from "@/components/videos/Slug"

export default async function Page({ params }: { params: { slug: string } }) {

    const payload = await getPayloadHMR({ config })
    const query = await payload.find({
        collection: "videos",
        where: {
            slug: {
                equals: params.slug
            }
        },
    })

    if (!query.docs.length) {
        notFound()
    }

    const videosPage = await payload.findGlobal({
		slug: 'videosPage',
	})

    const videos = await payload.find({
        collection: "videos",
    })

    return <PageComponent videosPage={videosPage} video={query.docs[0]} videos={videos.docs} />


}
