/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface QuotaRefundSuccessProps {
	creditNoteNumber: string
	paymentAmount: string
	quotaYear: number
	userDisplayName: string
}

/* * */

export function QuotaRefundSuccess({ creditNoteNumber, paymentAmount, quotaYear, userDisplayName }: QuotaRefundSuccessProps) {
	return (
		<Wrapper previewMessage="Reembolso da Quota de Sócio SPG">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>Informamos que a <strong>Quota de Sócio para o ano de {quotaYear}</strong> foi reembolsada para o método de pagamento utilizado originalmente.</Paragraph>
			<Paragraph>Em anexo poderá encontrar a Nota de Crédito <strong>{creditNoteNumber}</strong>, no valor de <strong>{paymentAmount}</strong>.</Paragraph>
			<Paragraph>Se necessitar de algum esclarecimento adicional, ou se algo não estiver correto, por favor entre em contacto com o Secretariado SPG.</Paragraph>
			<Farewell text="Academia SPG" />
		</Wrapper>
	);
};

/* * */

QuotaRefundSuccess.PreviewProps = {
	creditNoteNumber: 'NC 2025/12',
	paymentAmount: '50,00€',
	quotaYear: 2024,
	userDisplayName: 'Dra. Susana Silva',
} as QuotaRefundSuccessProps;

/* * */

export default QuotaRefundSuccess;
