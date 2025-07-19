/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { MainButton } from '@/components/MainButton';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface AccountActivationProps {
	resetPasswordUrl: string
	userDisplayName: string
}

/* * */

export const accountActivationSubject = 'A sua conta está confirmada';

/* * */

export function AccountActivationTemplate({ resetPasswordUrl, userDisplayName }: AccountActivationProps) {
	return (
		<Wrapper previewMessage="A Direção da SPG confirmou a sua conta.">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>A Direção da SPG analisou os seus dados e aceitou a sua candidatura à Sociedade.</Paragraph>
			<Paragraph>Agora já pode definir a sua password e aceder aos conteúdos dedicados que temos preparados para si. Participe na discussão publicando um vídeo sobre a sua experiência cirúrgica, ou explore os inúmeros webinars disponíveis na Academia SPG.</Paragraph>
			<Paragraph>Acedendo ao seu Perfil SPG pode também gerir os seus dados pessoais e de faturação, e manter as suas quotas de sócio em dia.</Paragraph>
			<MainButton href={resetPasswordUrl} label="Definir Password" />
			<Paragraph>Damos-lhe as boas vindas à Sociedade e esperamos que usufrua de todo o trabalho que desenvolvemos para si e para a especialidade.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

AccountActivationTemplate.PreviewProps = {
	resetPasswordUrl: 'https://spginecologia.pt/reset?token=example-token',
	userDisplayName: 'Dra. Susana Silva',
} as AccountActivationProps;

/* * */

export default AccountActivationTemplate;
