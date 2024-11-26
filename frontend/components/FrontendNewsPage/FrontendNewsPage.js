/* * */

import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendNewsGridFeatured from '@/components/FrontendNewsGridFeatured/FrontendNewsGridFeatured';
import FrontendNewsGridWrapper from '@/components/FrontendNewsGridWrapper/FrontendNewsGridWrapper';
import FrontendNewsGridRegular from '@/components/FrontendNewsGridRegular/FrontendNewsGridRegular';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';

/* * */

export default function FrontendNewsPage() {
  //

  //
  // A. Setup variables

  const newsData = [
    {
      id: '1',
      title: 'A Menopausa e o Risco de Doença Cardiovascular',
      image_url: 'https://spginecologia.pt/wp-content/uploads/2023/10/Portugese-2023-WMD-FLYER-Colour-1-copy-scaled.jpg',
      topics: [1, 2, 3],
      text: 'Assinala-se anualmente a 18 de outubro o Dia Mundial da Menopausa. Em 2023 o tema em destaque da IMS (International Menopause Society) são as Doenças Cardiovasculares...',
      publish_date: new Date().toISOString(),
    },
  ];

  //
  // B. Render components

  return (
    <FrontendWrapperInner>
      <FrontendSection first>
        <FrontendNewsGridFeatured />
      </FrontendSection>
      <FrontendSection title="Notícias">
        <FrontendNewsGridWrapper>
          {newsData.map((item) => (
            <FrontendNewsGridRegular key={item.id} id={item.id} image_url={item.image_url} topics={item.topics} title={item.title} text={item.text} publish_date={item.publish_date} />
          ))}
        </FrontendNewsGridWrapper>
      </FrontendSection>
    </FrontendWrapperInner>
  );

  //
}
