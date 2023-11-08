/* * */

import Link from 'next-intl/link';
import Image from 'next/image';
import styles from './FrontendNewsGridFeatured.module.css';
import Text from '@/components/Text/Text';
import Title from '@/components/Title/Title';
import FrontendTopicTag from '@/components/FrontendTopicTag/FrontendTopicTag';
import FrontendPublishDate from '@/components/FrontendPublishDate/FrontendPublishDate';

/* * */

export default function FrontendNewsGridFeatured() {
  return (
    <Link href={'/'} className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image src="https://spginecologia.pt/wp-content/uploads/2023/10/Portugese-2023-WMD-FLYER-Colour-1-copy-scaled.jpg" fill style={{ objectFit: 'cover' }} />
      </div>
      <div className={styles.contentWrapper}>
        <FrontendTopicTag noLink />
        <Title text="A Menopausa e o Risco de Doença Cardiovascular" />
        <Text
          text='Assinala-se anualmente a 18 de outubro o Dia Mundial da Menopausa. Em 2023 o tema em destaque da IMS (International Menopause Society) são as Doenças Cardiovasculares.
Neste âmbito, foi disponibilizado pela IMS um Livro Branco para profissionais de saúde sobre os "Marcos reprodutivos ao longo da vida e risco de doença cardiovascular na mulher"...'
        />
        <FrontendPublishDate />
      </div>
    </Link>
  );
}
