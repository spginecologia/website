/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';
import { type EmailTemplate } from '@/types/email-template';
import { render } from '@react-email/render';

/* * */

export interface SignupEffectiveConfirmationProps {
	sponsorsTaxIds: string[]
	userDisplayName: string
}

/* * */

export const signupEffectiveConfirmationSubject = 'Recebemos a sua candidatura à SPG';

/* * */

export default function SignupEffectiveConfirmationTemplate({ sponsorsTaxIds, userDisplayName }: SignupEffectiveConfirmationProps) {
	return (
		<Wrapper previewMessage="A sua conta SPG está em confirmação.">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>Agradecemos o seu interesse em tornar-se membro da SPG.</Paragraph>
			<Paragraph>Foi enviado um pedido de confirmação aos {sponsorsTaxIds.length} Sócios SPG que indicou. Pelo menos 2 devem aceitar ser seu Proponente para que a sua conta seja automaticamente ativada.</Paragraph>
			<Paragraph>Para qualquer dúvida ou esclarecimento, por favor contacte o Secretariado da SPG.</Paragraph>
			<Paragraph>NIFs indicados:</Paragraph>
			{sponsorsTaxIds.map((taxId, index) => (
				<Paragraph key={index}>{taxId}</Paragraph>
			))}
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

SignupEffectiveConfirmationTemplate.PreviewProps = {
	sponsorsTaxIds: ['123456789', '987654321'],
	userDisplayName: 'Dra. Susana Silva',
} as SignupEffectiveConfirmationProps;

/* * */

export const renderSignupEffectiveConfirmationTemplate = async (props: SignupEffectiveConfirmationProps): Promise<EmailTemplate> => {
	return {
		html: await render(<SignupEffectiveConfirmationTemplate {...props} />),
		subject: signupEffectiveConfirmationSubject,
	};
};
