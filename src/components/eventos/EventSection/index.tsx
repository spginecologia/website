import { Event } from '@/payload-types';

import styles from './styles.module.css';
import RichText from '@/components/common/RichText';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';

export default function Component({ sections }: { sections: Event['sections'] }) {
    return (
        <Section>
            <Grid columns="abcd">
                <div className={styles.index}>
                    {sections?.map((section, index) => (
                        <a key={index} className={styles.indexItem} href={`#section-${index}`}>{section.title}</a>
                    ))}
                </div>
                <div className={styles.sectionWrapper}>
                    {sections?.map((section, index) => (
                        <div key={index} className={styles.section} id={`section-${index}`}>
                            <div className={styles.sectionHeader}>
                                <h3 className={styles.sectionTitle}>{section.title}</h3>
                                <div className={styles.sectionSeparator} />
                            </div>
                            <div className={styles.sectionContent}>
                                {section.evento_section_type === "text" && section.content && <RichText content={section.content} />}
                                {/* {section.evento_section_type === "images" && section.images && <Gallery images={section.images} />}
                        {section.evento_section_type === "video" && section.video && <Video video={section.video} />} */}
                                {section.evento_section_type === "iframe" && section.iframe && <div className={styles.iframe} dangerouslySetInnerHTML={{ __html: section.iframe as string }} />}
                            </div>
                        </div>
                    ))}
                </div>
            </Grid>
        </Section>
    );
}
