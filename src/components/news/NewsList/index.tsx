import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { Section } from "@/components/layout/Section"
import { Grid } from "@/components/layout/Grid"

import styles from "./styles.module.css"
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/common/card"
import { Media } from "@/payload-types"
import { serializeLexical } from "@/payload/lexical/serializeLexical"

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
                    <Card key={item.id} image={{ src: (item.featured as Media)?.url ?? "/placeholder.png", alt: item.title, size: 200, objectFit: 'cover' }} className={styles.card} link={`/noticias/${item.slug}`}>
                        <div className={styles.cardContent}>
                            <CardHeader variant="primary">{item.title}</CardHeader>
                            <div className={styles.cardDescription}>
                                <CardDescription>No Dia Nacional da Sustentabilidade, o Conselho Português para a Saúde e Ambiente lançou um alerta sobre o problema dos plásticos no sector da s...</CardDescription>
                                <CardFooter>Publicado a {new Date(item.createdAt).toLocaleDateString()}</CardFooter>
                            </div>
                        </div>
                    </Card>
                ))}
            </Grid>
        </Section>
    )
}
