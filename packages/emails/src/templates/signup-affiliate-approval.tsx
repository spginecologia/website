/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';
import { type EmailTemplate } from '@/types/emai-template';
import { render } from '@react-email/render';

/* * */

export interface SignupAffiliateApprovalProps {
	userDisplayName: string
}

/* * */

export const signupAffiliateApprovalSubject = 'Recebemos a sua candidatura à SPG';

/* * */

export default function SignupAffiliateApprovalTemplate({ userDisplayName }: SignupAffiliateApprovalProps) {
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

SignupAffiliateApprovalTemplate.PreviewProps = {
	userDisplayName: 'Dra. Susana Silva',
} as SignupAffiliateApprovalProps;

/* * */

export const renderSignupAffiliateApprovalTemplate = async (props: SignupAffiliateApprovalProps): Promise<EmailTemplate> => {
	return {
		html: await render(<SignupAffiliateApprovalTemplate {...props} />),
		subject: signupAffiliateApprovalSubject,
	};
};
