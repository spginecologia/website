/* * */

import FrontendPublishDate from '@/components/FrontendPublishDate/FrontendPublishDate';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import Title from '@/components/Title/Title';
import Image from 'next/image';

import FrontendTopicTag from '../../FrontendTopicTag/FrontendTopicTag';
import styles from './styles.module.css';

/* * */

export function EventDetail({ id }) {
	//

	//
	// A. Setup variables

	const newsData = {
		id: '1',
		image_url: 'https://spginecologia.pt/wp-content/uploads/2023/10/Portugese-2023-WMD-FLYER-Colour-1-copy-scaled.jpg',
		publish_date: new Date().toISOString(),
		text: `<p>Assinala-se anualmente a 18 de outubro o Dia Mundial da Menopausa. Em 2023 o tema em destaque da IMS (International Menopause Society) são as Doenças Cardiovasculares.</p>
    <p>Neste âmbito, foi disponibilizado pela IMS um Livro Branco para profissionais de saúde sobre os "Marcos reprodutivos ao longo da vida e risco de doença cardiovascular na mulher", da autoria da Drª Cynthia Stuenkel.</p>
    <p>"A doença cardiovascular (DCV) é a principal causa de morte na mulher nos países desenvolvidos e em desenvolvimento. Para além dos fatores de risco cardiovascular tradicionais, foram reconhecidos vários marcos reprodutivos. O objetivo deste Livro Branco, publicado pela Sociedade Internacional de Menopausa em conjunto com o Dia Mundial da Menopausa 2023, é destacar os marcos reprodutivos femininos que influenciam o potencial risco cardiovascular e rever as recomendações para minimizar esse risco. Os principais marcos discutidos relacionam-se com a regularidade menstrual, os resultados adversos da gravidez, os tratamentos do cancro da mama e a menopausa. (...) &nbsp;A promoção da saúde cardiovascular das mulheres tem efeitos a longo prazo para elas próprias, para as suas famílias e para a sua descendência. É altura de fazer da saúde cardiovascular das mulheres uma prioridade."</p>
    <p>Consulte&nbsp; <a href="https://www.imsociety.org/wp-content/uploads/2023/10/Portuguese-White-Paper.pdf" target="_blank" rel="noopener">AQUI</a> a versão em português do Livro Branco .</p>
    <p>A IMS produziu ainda um Folheto Informativo da Paciente para ajudar as mulheres a compreender melhor a doença e como ela pode ser gerenciada e tratada.</p>
    <p>Aceda ao Folheto para pacientes <a href="https://www.imsociety.org/wp-content/uploads/2023/10/Portugese-2023-WMD-FLYER-Colour.pdf" target="_blank" rel="noopener">AQUI</a>&nbsp;e a todos os recursos no <a href="https://www.imsociety.org/education/world-menopause-day/" target="_blank" rel="noopener">site da IMS</a></p>`,
		title: 'A Menopausa e o Risco de Doença Cardiovascular',
		topics: [1, 2, 3],
	};
	//
	// B. Render components

	return (
		<FrontendWrapperInner>
			<FrontendSection first>
				<div className={styles.imageWrapper}>
					<Image alt="" src={newsData.image_url} style={{ objectFit: 'cover' }} fill />
				</div>
			</FrontendSection>
			<FrontendSection>
				<div className={styles.contentWrapper}>
					<FrontendTopicTag _id="" />
					<Title text={newsData.title} />
					<div className={styles.actionsWrapper}>
						<div className={styles.shareStrip}>share strip</div>
						<FrontendPublishDate date={newsData.publish_date} />
					</div>
					<div className={styles.newsBody} dangerouslySetInnerHTML={{ __html: newsData.text }} />
				</div>
			</FrontendSection>
		</FrontendWrapperInner>
	);

	//
}
