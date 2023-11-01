/* * */

import Loader from '@/components/Loader/Loader';
import Section from '@/components/Section/Section';

/* * */

export default function Loading() {
  return (
    <Section first>
      <Loader visible full />
    </Section>
  );
}
