import SectionMission from "@/components/sociedade/SectionMission";
import { Section } from "@/components/layout/Section";
import SectionCards from "@/components/seccoes/SectionCards";
import AcademySection from "@/components/home/AcademySection";
import HomeNewsSection from "@/components/home/HomeNewsSection";
import HomeEventSection from "@/components/home/HomeEventSection";
import HomeConsensosSection from "@/components/home/HomeConsensosSection";

export default async function Page() {

    return (
        <>
            <HomeNewsSection />
            <SectionMission />
            <HomeEventSection />
            <Section heading="Secções" variant="secondary">
                <SectionCards />
            </Section>
            <Section heading="Academia SPG" />
            <AcademySection />
            <HomeConsensosSection />
        </>
    )
}
