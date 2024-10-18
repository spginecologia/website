import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { Section } from "@/components/layout/Section"
import { Grid } from "@/components/layout/Grid"

import styles from "./styles.module.css"
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/common/card"
import { Media } from "@/payload-types"
import { serializeLexical } from "@/payload/lexical/serializeLexical"
import reactNodeToString from "react-node-to-string"

export default async function NewsList() {

    const payload = await getPayloadHMR({ config })
    const newsList = await payload.find({
        collection: "noticias",
        pagination: true,
        limit: 1000,
    })

    return (
        <Section heading="Notícias">
            <Grid columns="abc" align="center" withGap>
                {newsList.docs?.map((item) => (
                    <Card key={item.id} image={{ src: (item.featured as Media)?.url ?? "/placeholder.png", alt: item.title, size: 300, objectFit: 'cover' }} className={styles.card} link={`/noticias/${item.slug}`}>
                        <div className={styles.cardContent}>
                            <CardHeader variant="primary">{item.title}</CardHeader>
                            <div className={styles.cardDescription}>
                                <CardDescription>{reactNodeToString(serializeLexical(item.content))}</CardDescription>
                                <CardFooter>Publicado a {new Date(item.createdAt).toLocaleDateString()}</CardFooter>
                            </div>
                        </div>
                    </Card>
                ))}
            </Grid>
        </Section>
    )
}
