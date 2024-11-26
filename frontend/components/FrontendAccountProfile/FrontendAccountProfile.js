'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendAccountProfile.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import Panel from '@/components/Panel/Panel';
import FrontendAccountProfileView from '@/components/FrontendAccountProfileView/FrontendAccountProfileView';
import FrontendAccountProfileEdit from '@/components/FrontendAccountProfileEdit/FrontendAccountProfileEdit';

/* * */

export default function FrontendAccountProfile() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendAccountProfile');

  //
  // B. Render components

  return (
    <Panel>
      <div className={styles.container}>
        <Title level="h2" text={t('title')} />
        <Text text={t('subtitle')} />
        <FrontendAccountProfileEdit />
      </div>
    </Panel>
  );
}
