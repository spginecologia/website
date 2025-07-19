/* * */

import { type AccountActivationProps, accountActivationSubject, AccountActivationTemplate } from '@/templates/account-activation';
import { type AccountPasswordResetProps, accountPasswordResetSubject, AccountPasswordResetTemplate } from '@/templates/account-password-reset';
import { type AccountSignupProps, accountSignupSubject, AccountSignupTemplate } from '@/templates/account-signup';
import { type QuotaPaymentSuccessProps, quotaPaymentSuccessSubject, QuotaPaymentSuccessTemplate } from '@/templates/quota-payment-success';
import { type QuotaRefundSuccessProps, quotaRefundSuccessSubject, QuotaRefundSuccessTemplate } from '@/templates/quota-refund-success';
import { render } from '@react-email/render';

/* * */

interface EmailTemplate {
	html: string
	subject: string
}

/* * */

export const renderAccountActivationTemplate = async (props: AccountActivationProps): Promise<EmailTemplate> => {
	return {
		html: await render(<AccountActivationTemplate {...props} />),
		subject: accountActivationSubject,
	};
};

export const renderAccountPasswordResetTemplate = async (props: AccountPasswordResetProps): Promise<EmailTemplate> => {
	return {
		html: await render(<AccountPasswordResetTemplate {...props} />),
		subject: accountPasswordResetSubject,
	};
};

export const renderAccountSignupTemplate = async (props: AccountSignupProps): Promise<EmailTemplate> => {
	return {
		html: await render(<AccountSignupTemplate {...props} />),
		subject: accountSignupSubject,
	};
};

export const renderQuotaPaymentSuccessTemplate = async (props: QuotaPaymentSuccessProps): Promise<EmailTemplate> => {
	return {
		html: await render(<QuotaPaymentSuccessTemplate {...props} />),
		subject: quotaPaymentSuccessSubject,
	};
};

export const renderQuotaRefundSuccessTemplate = async (props: QuotaRefundSuccessProps): Promise<EmailTemplate> => {
	return {
		html: await render(<QuotaRefundSuccessTemplate {...props} />),
		subject: quotaRefundSuccessSubject,
	};
};
