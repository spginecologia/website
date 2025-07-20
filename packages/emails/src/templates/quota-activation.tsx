/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { MainButton } from '@/components/MainButton';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface QuotaActivationProps {
	accountUrl: string
	paymentAmount: string
	quotaYear: number
	userDisplayName: string
}

/* * */

export const quotaActivationSubject = 'Foi emitida uma nova guia de pagamento para a sua Quota de Sócio SPG';

/* * */

export function QuotaActivationTemplate({ accountUrl, paymentAmount, quotaYear, userDisplayName }: QuotaActivationProps) {
	return (
		<Wrapper previewMessage="Confirmação de pagamento de Quota de Sócio SPG">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>
				Informamos que está disponível para pagamento a sua
				<strong>
					Quota de Sócio para o ano de
					{quotaYear}
				</strong>
				, no valor de
				<strong>{paymentAmount}</strong>
				.
			</Paragraph>
			<Paragraph>Agora é mais fácil manter as quotas em dia acedendo à sua Conta SPG. Antes do pagamento, por favor verifique se os seus dados de faturação estão atualizados, para que a fatura seja corretamente emitida no NIF desejado.</Paragraph>
			<Paragraph>É fundamental manter os seus pagamentos em dia para que possamos continuar a desenvolver o futuro da nossa especialidade.</Paragraph>
			<MainButton href={accountUrl} label="Pagar Agora" />
			<Paragraph>Se necessitar de algum esclarecimento adicional, ou se algo não estiver correto, por favor entre em contacto com o Secretariado SPG.</Paragraph>
			<Paragraph>Agradecemos a sua colaboração.</Paragraph>
			<Farewell text="Secretariado SPG" />
		</Wrapper>
	);
};

/* * */

QuotaActivationTemplate.PreviewProps = {
	accountUrl: 'https://spginecologia.pt/account',
	paymentAmount: '50,00€',
	quotaYear: 2024,
	userDisplayName: 'Dra. Susana Silva',
} as QuotaActivationProps;

/* * */

export default QuotaActivationTemplate;
