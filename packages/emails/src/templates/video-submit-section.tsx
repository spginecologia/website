/* * */

import { Farewell } from '@/components/Farewell';
import { MainButton } from '@/components/MainButton';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface VideoSubmitSectionProps {
	videoUrl: string
}

/* * */

export const videoSubmitSectionSubject = 'Novo vídeo publicado';

/* * */

export function VideoSubmitSectionTemplate({ videoUrl }: VideoSubmitSectionProps) {
	return (
		<Wrapper previewMessage="É necessário validação.">
			<Paragraph>Foi publicado um novo vídeo na Academia SPG.</Paragraph>
			<Paragraph>É necessário validar o conteúdo do vídeo e tomar uma decisão em relação à sua publicação.</Paragraph>
			<MainButton href={videoUrl} label="Validar Vídeo" />
			<Paragraph>Para conseguir aceder ao vídeo, é necessário iniciar sessão na sua conta SPG.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

VideoSubmitSectionTemplate.PreviewProps = {
	videoUrl: 'https://spginecologia.pt/video/12345',
} as VideoSubmitSectionProps;

/* * */

export default VideoSubmitSectionTemplate;
