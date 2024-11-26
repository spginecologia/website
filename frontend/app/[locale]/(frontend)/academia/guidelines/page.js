/* * */

import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import Section from '@/components/FrontendSection/FrontendSection';
import { Space } from '@mantine/core';

/* * */

export default function Page() {
  return (
    <Section first>
      <NoDataLabel text={'Consensos'} />
      <Space h={300} />
    </Section>
  );
}
