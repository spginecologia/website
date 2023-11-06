/* * */

import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendNewsGridFeatured from '@/components/FrontendNewsGridFeatured/FrontendNewsGridFeatured';

/* * */

export default function FrontendNewsPage() {
  //

  //
  // A. Setup variables

  //
  // B. Render components

  return (
    <>
      <FrontendSection first>
        <FrontendNewsGridFeatured />
      </FrontendSection>
      <FrontendSection title="Notícias">
        <NoDataLabel text={'Notícias'} />
      </FrontendSection>
    </>
  );

  //
}
