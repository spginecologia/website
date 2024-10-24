import { Card, CardContent, CardFooter } from "@/components/common/card";
import { Grid } from "@/components/layout/Grid";
import { Media, Consenso } from "@/payload-types";

export default function ConsensoList({ consensos }: { consensos: Consenso[] }) {
    return <Grid columns="abcd" gap="md">
        {consensos.map((consenso) => {
            const link = consenso.consenso_type === "file" ? (consenso.consenso_file as Media)?.url : consenso.consenso_url
            return (
                <Card key={consenso.id} style={{ height: "100%" }} link={link || ""} target="_blank" image={{ src: (consenso.featured as Media)?.url || "/placeholder.png", alt: consenso.title, size: 400 }}>
                    <CardContent>{consenso.title}</CardContent>
                    <CardFooter style={{ marginTop: "auto" }}>Publicado a {new Date(consenso.createdAt).toLocaleDateString()}</CardFooter>
                </Card>
            )
        })}
    </Grid >
}