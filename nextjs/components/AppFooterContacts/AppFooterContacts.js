/* * */

import styles from './AppFooterContacts.module.css';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, LinkedIn } from '@/assets/socials';

/* * */

export default function AppFooterContacts() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppFooterContacts');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <div className={styles.contacts}>
        <a className={styles.contactItem} href="tel:+351919494636">
          +351 919 494 636
        </a>
        <a className={styles.contactItem} href="mailto:secretariado@spginecologia.pt">
          secretariado@spginecologia.pt
        </a>
        <a className={styles.contactItem} href="mailto:academia@spginecologia.pt">
          academia@spginecologia.pt
        </a>
      </div>
      <div className={styles.socials}>
        <a href="https://www.facebook.com/spginecologia" target="_blank">
          <Facebook />
        </a>
        <a href="https://www.instagram.com/spginecologia" target="_blank">
          <Instagram />
        </a>
        <a href="https://www.linkedin.com/company/spginecologia" target="_blank">
          <LinkedIn />
        </a>
      </div>
      <div className={styles.address}>
        <p className={styles.addressTitle}>{t('address.title')}</p>
        <p className={styles.addressLine}>Edifício Cruzeiro 4 — 2º andar, sala 32</p>
        <p className={styles.addressLine}>Largo Cruz de Celas — 3000-132 Coimbra</p>
        <p className={styles.addressLine}>Portugal</p>
      </div>
    </div>
  );

  //
}
