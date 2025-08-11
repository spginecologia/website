/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface AccountSignupProps {
	userDisplayName: string
}

/* * */

export const accountSignupSubject = 'Recebemos a sua candidatura à SPG';

/* * */

export function AccountSignupTemplate({ userDisplayName }: AccountSignupProps) {
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

AccountSignupTemplate.PreviewProps = {
	userDisplayName: 'Dra. Susana Silva',
} as AccountSignupProps;

/* * */

export default AccountSignupTemplate;
