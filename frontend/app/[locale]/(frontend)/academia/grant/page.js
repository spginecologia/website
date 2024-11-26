/* * */

import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import Section from '@/components/FrontendSection/FrontendSection';
import { Space } from '@mantine/core';

/* * */

export default function Page() {
  return (
    <Section first>
      <NoDataLabel text={'Bolsa de Investigação'} />
      <Space h={300} />
    </Section>
  );
}
