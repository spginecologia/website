'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './AccountExplorerProfile.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import Panel from '@/components/Panel/Panel';

/* * */

export default function AccountExplorerProfile() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AccountExplorerProfile');

  //
  // C. Render components

  return (
    <Panel>
      <div className={styles.container}>
        <Title level="h2" text={t('title')} />
        <Text text={t('subtitle')} />
      </div>
    </Panel>
  );
}
