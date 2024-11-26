/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendSubscriptionRenewLoading.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import Loader from '@/components/Loader/Loader';

/* * */

export default function FrontendSubscriptionRenewLoading() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendSubscriptionRenewLoading');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <Loader visible />
      <Title level="h2" text={t('title')} />
      <Text text={t('subtitle')} />
    </div>
  );

  //
}
