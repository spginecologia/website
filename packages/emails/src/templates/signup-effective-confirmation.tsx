/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';
import { type EmailTemplate } from '@/types/emai-template';
import { render } from '@react-email/render';

/* * */

export interface SignupEffectiveConfirmationProps {
	userDisplayName: string
}

/* * */

export const signupEffectiveConfirmationSubject = 'Recebemos a sua candidatura à SPG';

/* * */

export default function SignupEffectiveConfirmationTemplate({ userDisplayName }: SignupEffectiveConfirmationProps) {
	return (
		<Wrapper previewMessage="A sua conta SPG está em confirmação.">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>Agradecemos o seu interesse em tornar-se membro da SPG.</Paragraph>
			<Paragraph>Foi enviado um pedido de confirmação a cada um dos Sócios SPG que indicou. Pelo menos 2 devem confirmar a sua candidatura para que a sua conta seja automaticamente ativada.</Paragraph>
			<Paragraph>Para qualquer dúvida ou esclarecimento, por favor contacte o Secretariado da SPG.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

SignupEffectiveConfirmationTemplate.PreviewProps = {
	userDisplayName: 'Dra. Susana Silva',
} as SignupEffectiveConfirmationProps;

/* * */

export const renderSignupEffectiveConfirmationTemplate = async (props: SignupEffectiveConfirmationProps): Promise<EmailTemplate> => {
	return {
		html: await render(<SignupEffectiveConfirmationTemplate {...props} />),
		subject: signupEffectiveConfirmationSubject,
	};
};
