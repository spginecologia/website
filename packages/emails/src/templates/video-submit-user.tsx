/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface VideoSubmitUserProps {
	sectionTitle: string
	userDisplayName: string
}

/* * */

export const videoSubmitUserSubject = 'Obrigado por partilhar o seu vídeo';

/* * */

export function VideoSubmitUserTemplate({ sectionTitle, userDisplayName }: VideoSubmitUserProps) {
	return (
		<Wrapper previewMessage="Estamos a processar o seu vídeo.">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>Agradecemos por partilhar a sua experiência com os Sócios SPG.</Paragraph>
			<Paragraph>O seu vídeo está a ser processado e será analisado em breve pela {sectionTitle}. Assim que ficar disponível entraremos em contacto.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

VideoSubmitUserTemplate.PreviewProps = {
	sectionTitle: 'SPGA',
	userDisplayName: 'Dra. Susana Silva',
} as VideoSubmitUserProps;

/* * */

export default VideoSubmitUserTemplate;
