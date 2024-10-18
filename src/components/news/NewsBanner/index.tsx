import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { Section } from "@/components/layout/Section"
import { Grid } from "@/components/layout/Grid"
import Image from "next/image"
import styles from "./styles.module.css"
import { Card } from "@/components/common/card"
import { Media } from "@/payload-types"
import { serializeLexical } from "@/payload/lexical/serializeLexical"
import reactNodeToString from "react-node-to-string"

export default async function NewsList() {

    const payload = await getPayloadHMR({ config })
    const newsList = await payload.find({
        collection: "noticias",
        where: {
            is_featured: {
                equals: true
            }
        },
        limit: 1,
    })

    const content = reactNodeToString(serializeLexical(newsList.docs?.[0].content))

    return (
        <Section>
            <Card direction="row" link={`/noticias/${newsList.docs?.[0].slug}`} variant="primary" className={styles.banner}>
                <Grid columns="ab">
                    <div className={styles.bannerImage}>
                        <Image src={(newsList.docs?.[0].featured as Media)?.url ?? "/placeholder.png"} alt={newsList.docs?.[0].title} fill />
                    </div>
                    <div className={styles.bannerContent}>
                        <h2 className={styles.bannerTitle}>{newsList.docs?.[0].title}</h2>
                        <p className={styles.bannerDescription}>{content}</p>
                        <span className={styles.bannerDate}>Publicado a {new Date(newsList.docs?.[0].createdAt).toLocaleDateString()}</span>
                    </div>
                </Grid>
            </Card>
        </Section >
    )
}
