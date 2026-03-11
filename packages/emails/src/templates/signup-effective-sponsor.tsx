/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { MainButton } from '@/components/MainButton';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';
import { type EmailTemplate } from '@/types/emai-template';
import { render } from '@react-email/render';

/* * */

export interface SignupEffectiveSponsorProps {
	signupApprovalUrl: string
	userDisplayName: string
}

/* * */

export const signupEffectiveSponsorSubject = 'Foi indicado como patrocinador de uma candidatura à SPG';

/* * */

export default function SignupEffectiveSponsorTemplate({ signupApprovalUrl, userDisplayName }: SignupEffectiveSponsorProps) {
	return (
		<Wrapper previewMessage="A sua conta SPG está em confirmação.">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>Foi indicado como patrocinador da candidatura de um novo membro da SPG.</Paragraph>
			<Paragraph>Pedimos que tome uma decisão o mais breve possível, confirmando sempre os dados apresentados com atenção.</Paragraph>
			<MainButton href={signupApprovalUrl} label="Tomar uma decisão" />
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

SignupEffectiveSponsorTemplate.PreviewProps = {
	signupApprovalUrl: 'https://spginecologia.pt/signup-approval/123456789',
	userDisplayName: 'Dra. Susana Silva',
} as SignupEffectiveSponsorProps;

/* * */

export const renderSignupEffectiveSponsorTemplate = async (props: SignupEffectiveSponsorProps): Promise<EmailTemplate> => {
	return {
		html: await render(<SignupEffectiveSponsorTemplate {...props} />),
		subject: signupEffectiveSponsorSubject,
	};
};
