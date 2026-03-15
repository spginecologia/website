/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { MainButton } from '@/components/MainButton';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface VideoApprovalUserProps {
	userDisplayName: string
	videoTitle: string
	videoUrl: string
}

/* * */

export const videoApprovalUserSubject = 'O seu vídeo está publicado!';

/* * */

export function VideoApprovalUserTemplate({ userDisplayName, videoTitle, videoUrl }: VideoApprovalUserProps) {
	return (
		<Wrapper previewMessage="Obrigado por partilhar a sua experiência.">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>O vídeo <strong>&quot;{videoTitle}&quot;</strong> foi aprovado e já está disponível na Academia SPG!</Paragraph>
			<MainButton href={videoUrl} label="Ver Vídeo" />
			<Paragraph>Partilhe este link com os seus colegas: <strong>{videoUrl}</strong></Paragraph>
			<Paragraph>Obrigado por contribuir para o crescimento da nossa comunidade científica.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

VideoApprovalUserTemplate.PreviewProps = {
	userDisplayName: 'Dra. Susana Silva',
	videoTitle: 'Remoção de DIU retido por histeroscopia office com recurso a anestesia histeroscópica',
	videoUrl: 'https://spginecologia.pt/video/12345',
} as VideoApprovalUserProps;

/* * */

export default VideoApprovalUserTemplate;
