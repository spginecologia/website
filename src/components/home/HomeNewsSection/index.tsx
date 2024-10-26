
import NewsSection from "@/components/news/NewsList";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@/payload.config";

export default async function HomeNewsSection() {
    const payload = await getPayloadHMR({ config })
    const newsList = await payload.find({
        collection: "noticias",
        pagination: true,
        limit: 3,
        sort: "-createdAt",
    })

    return <NewsSection news={newsList.docs} />
}
