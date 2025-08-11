/* * */

import { Farewell } from '@/components/Farewell';
import { Greeting } from '@/components/Greeting';
import { MainButton } from '@/components/MainButton';
import { Paragraph } from '@/components/Paragraph';
import { Wrapper } from '@/components/Wrapper';

/* * */

export interface QuotaActivationFreeProps {
	accountUrl: string
	paymentAmount: string
	quotaYear: number
	userDisplayName: string
}

/* * */

export const quotaActivationFreeSubject = 'Foi emitida uma nova guia de pagamento para a sua Quota de Sócio SPG';

/* * */

export function QuotaActivationFreeTemplate({ accountUrl, paymentAmount, quotaYear, userDisplayName }: QuotaActivationFreeProps) {
	return (
		<Wrapper previewMessage="Confirmação de pagamento de Quota de Sócio SPG">
			<Greeting text={`${userDisplayName},`} />
			<Paragraph>Informamos que a sua <strong>Quota de Sócio para o ano de {quotaYear}</strong>, no valor de <strong>{paymentAmount}</strong>, foi oferecida pela Direção SPG. Estamos empenhados em desenvolver o futuro da nossa especialidade consigo.</Paragraph>
			<MainButton href={accountUrl} label="Aceder à Conta SPG" />
			<Paragraph>Se necessitar de algum esclarecimento adicional, ou se algo não estiver correto, por favor entre em contacto com o Secretariado SPG.</Paragraph>
			<Farewell text="Secretariado SPG" />
		</Wrapper>
	);
};

/* * */

QuotaActivationFreeTemplate.PreviewProps = {
	accountUrl: 'https://spginecologia.pt/account',
	paymentAmount: '50,00€',
	quotaYear: 2024,
	userDisplayName: 'Dra. Susana Silva',
} as QuotaActivationFreeProps;

/* * */

export default QuotaActivationFreeTemplate;
