/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface QuotaPaymentSuccessProps {
	invoiceNumber: string
	paymentAmount: string
	quotaYear: number
	userDisplayName: string
}

/* * */

export const quotaPaymentSuccessSubject = 'Recebemos o pagamento da sua Quota de Sócio SPG';

/* * */

export function QuotaPaymentSuccessTemplate({ invoiceNumber, paymentAmount, quotaYear, userDisplayName }: QuotaPaymentSuccessProps) {
	return (
		<Wrapper previewMessage="Confirmação de pagamento de Quota de Sócio SPG">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>Informamos que a sua <strong>Quota de Sócio para o ano de {quotaYear}</strong> foi paga com sucesso.</Paragraph>
			<Paragraph>Em anexo poderá encontrar a Fatura <strong>{invoiceNumber}</strong>, no valor de <strong>{paymentAmount}</strong>, emitida de acordo com os dados introduzidos no seu Perfil SPG. Aqui é também possível consultar o seu extrato corrente, atualizar os seus dados e consultar documentos emitidos anteriormente.</Paragraph>
			<Paragraph>Se necessitar de algum esclarecimento adicional, ou se algo não estiver correto, por favor entre em contacto com o Secretariado SPG.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

QuotaPaymentSuccessTemplate.PreviewProps = {
	invoiceNumber: 'FT 2025/12',
	paymentAmount: '50,00€',
	quotaYear: 2024,
	userDisplayName: 'Dra. Susana Silva',
} as QuotaPaymentSuccessProps;

/* * */

export default QuotaPaymentSuccessTemplate;
