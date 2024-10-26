/* * */
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Assets } from "@/lib/assets";
import Image from "next/image";

import styles from './styles.module.css';
import { Card } from "@/components/common/card";
/* * */

export default function AcademySection() {
    return (
        <Section heading="Academia SPG">
            <Grid columns="abc" gap="lg" className={styles.grid}>
                <div className={styles.illustration}>
                    <Image
                        src={Assets.ACADEMY_ILLUSTRATION}
                        alt=""
                        width={300}
                        height={300}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </div>
                <div className={styles.content}>
                    <span>Apresentamos a</span>
                    <div className={styles.image}>
                        <Image
                            src={Assets.ACADEMY}
                            alt=""
                            width={300}
                            height={300}
                            style={{
                                width: 'auto',
                                height: '100%',
                            }}
                        />
                    </div>
                    <p>A SPG acredita que a verdadeira formação advém da exposição à realidade prática. Face a esta necessidade, a Academia SPG integra um conjunto de ferramentas que colaboram para a partilha da experiência clínica e cirúrgica.</p>
                </div>
            </Grid>
            <div className={styles.cardContainer}>
                <Card className={styles.card} link="/consensos">Consensos SPG</Card>
                <Card className={styles.card} link="/videos-cirurgicos">Vídeos Cirúrgicos</Card>
                <Card className={styles.card} link="/publicacoes-cientificas">Publicações Científicas</Card>
                <Card className={styles.card} link="/palestras-e-cursos">Palestras e Cursos</Card>
                <Card className={styles.card} link="/bolsa-de-investigacao">Bolsa de Investigação</Card>
                <Card className={styles.card} link="/pesquisa-por-topico">Pesquisa por Tópico</Card>
            </div>
        </Section>
    )
}