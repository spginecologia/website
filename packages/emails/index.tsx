/* * */

import { QuotaPaymentSuccess, type QuotaPaymentSuccessProps } from '@/templates/quota-payment-success';
import { QuotaRefundSuccess, type QuotaRefundSuccessProps } from '@/templates/quota-refund-success';
import { render } from '@react-email/render';

/* * */

export const renderQuotaPaymentSuccess = async (props: QuotaPaymentSuccessProps) => {
	return await render(<QuotaPaymentSuccess {...props} />);
};

export const renderQuotaRefundSuccess = async (props: QuotaRefundSuccessProps) => {
	return await render(<QuotaRefundSuccess {...props} />);
};
