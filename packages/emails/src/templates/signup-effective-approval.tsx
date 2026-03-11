/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { MainButton } from '@/components/MainButton';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';
import { type EmailTemplate } from '@/types/emai-template';
import { render } from '@react-email/render';

/* * */

export interface SignupEffectiveApprovalProps {
	resetPasswordUrl: string
	userDisplayName: string
}

/* * */

export const signupEffectiveApprovalSubject = 'A sua conta está confirmada';

/* * */

export default function SignupEffectiveApprovalTemplate({ resetPasswordUrl, userDisplayName }: SignupEffectiveApprovalProps) {
	return (
		<Wrapper previewMessage="A sua conta está confirmada.">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>Os Sócios SPG que indicou na sua candidatura confirmaram a sua conta.</Paragraph>
			<Paragraph>Agora já pode definir a sua password e aceder aos conteúdos dedicados que temos preparados para si. Participe na discussão publicando um vídeo sobre a sua experiência cirúrgica, ou explore os inúmeros webinars disponíveis na Academia SPG.</Paragraph>
			<Paragraph>Acedendo ao seu Perfil SPG pode também gerir os seus dados pessoais e de faturação, e manter as suas quotas de sócio em dia.</Paragraph>
			<MainButton href={resetPasswordUrl} label="Definir Password" />
			<Paragraph>Damos-lhe as boas vindas à Sociedade e esperamos que usufrua de todo o trabalho que desenvolvemos para si e para a especialidade.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

SignupEffectiveApprovalTemplate.PreviewProps = {
	resetPasswordUrl: 'https://spginecologia.pt/reset?token=example-token',
	userDisplayName: 'Dra. Susana Silva',
} as SignupEffectiveApprovalProps;

/* * */

export const renderSignupEffectiveApprovalTemplate = async (props: SignupEffectiveApprovalProps): Promise<EmailTemplate> => {
	return {
		html: await render(<SignupEffectiveApprovalTemplate {...props} />),
		subject: signupEffectiveApprovalSubject,
	};
};
