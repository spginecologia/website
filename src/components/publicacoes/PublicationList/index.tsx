import { Card, CardContent, CardFooter } from "@/components/common/card";
import { Grid } from "@/components/layout/Grid";
import { Media, Publication } from "@/payload-types";

export default function PublicationList({ publications }: { publications: Publication[] }) {
    return <Grid columns="abcd" gap="md">
        {publications.map((publication) => (
            <Card key={publication.id} style={{ height: "100%" }} link={(publication.publication_file as Media).url || ""} target="_blank" image={{ src: (publication.featured as Media).url || "", alt: publication.title, size: 400 }}>
                <CardContent>{publication.title}</CardContent>
                <CardFooter style={{ marginTop: "auto" }}>Publicado a {new Date(publication.createdAt).toLocaleDateString()}</CardFooter>
            </Card>
        ))}
    </Grid>
}