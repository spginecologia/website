/* * */

import { QuotaPaymentSuccess, type QuotaPaymentSuccessProps } from '@/templates/quota-payment-success';
import { QuotaRefundSuccess, type QuotaRefundSuccessProps } from '@/templates/quota-refund-success';
import { render } from '@react-email/components';

/* * */

export const RenderQuotaPaymentSuccess = async (props: QuotaPaymentSuccessProps) => {
	return await render(<QuotaPaymentSuccess {...props} />);
};

export const RenderQuotaRefundSuccess = async (props: QuotaRefundSuccessProps) => {
	return await render(<QuotaRefundSuccess {...props} />);
};
