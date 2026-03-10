/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';
import { type EmailTemplate } from '@/types/emai-template';
import { render } from '@react-email/render';

/* * */

export interface SignupEffectiveSponsorProps {
	userDisplayName: string
}

/* * */

export const signupEffectiveSponsorSubject = 'Recebemos a sua candidatura à SPG';

/* * */

export default function SignupEffectiveSponsorTemplate({ userDisplayName }: SignupEffectiveSponsorProps) {
	return (
		<Wrapper previewMessage="A sua conta SPG está em confirmação.">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>Agradecemos o seu interesse em tornar-se membro da SPG.</Paragraph>
			<Paragraph>Os seus dados serão analisados em breve pela Direção da SPG. Após a análise, receberá um email com a confirmação de ativação da sua conta.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

SignupEffectiveSponsorTemplate.PreviewProps = {
	userDisplayName: 'Dra. Susana Silva',
} as SignupEffectiveSponsorProps;

/* * */

export const renderSignupEffectiveSponsorTemplate = async (props: SignupEffectiveSponsorProps): Promise<EmailTemplate> => {
	return {
		html: await render(<SignupEffectiveSponsorTemplate {...props} />),
		subject: signupEffectiveSponsorSubject,
	};
};
