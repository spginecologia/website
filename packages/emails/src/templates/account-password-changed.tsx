/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface AccountPasswordChangedProps {
	userDisplayName: string
}

/* * */

export const accountPasswordChangedSubject = 'Importante: A sua password foi alterada com sucesso.';

/* * */

export function AccountPasswordChangedTemplate({ userDisplayName }: AccountPasswordChangedProps) {
	return (
		<Wrapper previewMessage="Informação importante sobre a sua conta SPG">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>A sua password foi alterada com sucesso. Se não efetuou esta alteração, por favor contacte o suporte imediatamente e altere a sua password acedendo ao site da SPG.</Paragraph>
			<Paragraph>Verifique que o remetente dos emails é legítimo antes de clicar em qualquer link.</Paragraph>
			<Paragraph>A SPG nunca solicitará a sua password por email ou telefone.</Paragraph>
			<Paragraph>Se efetuou este pedido, pode ignorar este email.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

AccountPasswordChangedTemplate.PreviewProps = {
	userDisplayName: 'Dra. Susana Silva',
} as AccountPasswordChangedProps;

/* * */

export default AccountPasswordChangedTemplate;
