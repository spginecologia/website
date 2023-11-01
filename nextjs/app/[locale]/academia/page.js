/* * */

import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import Section from '@/components/Section/Section';
import { Space } from '@mantine/core';

/* * */

export default function Page() {
  return (
    <Section first>
      <NoDataLabel text={'Academia SPG'} />
      <Space h={300} />
    </Section>
  );
}
