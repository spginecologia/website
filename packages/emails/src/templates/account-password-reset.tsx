/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { MainButton } from '@/components/MainButton';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface AccountPasswordResetProps {
	resetPasswordUrl: string
	userDisplayName: string
}

/* * */

export const accountPasswordResetSubject = 'Recuperação de Password';

/* * */

export function AccountPasswordResetTemplate({ resetPasswordUrl, userDisplayName }: AccountPasswordResetProps) {
	return (
		<Wrapper previewMessage="Passos para definir a sua password.">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>Recebemos um pedido de recuperação de password para a sua conta. Utilize o link seguinte para definir uma nova chave de acesso.</Paragraph>
			<MainButton href={resetPasswordUrl} label="Definir Nova Password" />
			<Paragraph>Se não efetuou este pedido, pode ignorar este email e a sua password manter-se-á inalterada.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

AccountPasswordResetTemplate.PreviewProps = {
	resetPasswordUrl: 'https://spginecologia.pt/reset?token=exampleToken',
	userDisplayName: 'Dra. Susana Silva',
} as AccountPasswordResetProps;

/* * */

export default AccountPasswordResetTemplate;
