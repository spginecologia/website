import { Section } from "@/components/layout/Section"
import { Grid } from "@/components/layout/Grid"

import styles from "./styles.module.css"
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/common/card"
import { Media, Noticia } from "@/payload-types"
import { serializeLexical } from "@/payload/lexical/serializeLexical"
import reactNodeToString from "react-node-to-string"

export default async function NewsList({ news }: { news: Noticia[] }) {

    return (
        <Section heading="Notícias">
            <Grid columns="abc" align="center" gap="lg">
                {news?.map((item) => (
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
