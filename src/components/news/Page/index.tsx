import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@/payload.config";

import NewsBanner from "../NewsBanner";
import NewsList from "../NewsList";

export default async function Component() {

    const payload = await getPayloadHMR({ config })
    const newsList = await payload.find({
        collection: "noticias",
        pagination: true,
        limit: 1000,
    })

    return <>
        <NewsBanner />
        <NewsList news={newsList.docs} />
    </>
}