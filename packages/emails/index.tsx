/* * */

import { type AccountPasswordChangedProps, accountPasswordChangedSubject, AccountPasswordChangedTemplate } from '@/templates/account-password-changed';
import { type AccountPasswordResetProps, accountPasswordResetSubject, AccountPasswordResetTemplate } from '@/templates/account-password-reset';
import { type QuotaActivationProps, quotaActivationSubject, QuotaActivationTemplate } from '@/templates/quota-activation';
import { type QuotaActivationFreeProps, quotaActivationFreeSubject, QuotaActivationFreeTemplate } from '@/templates/quota-activation-free';
import { type QuotaPaymentSuccessProps, quotaPaymentSuccessSubject, QuotaPaymentSuccessTemplate } from '@/templates/quota-payment-success';
import { type QuotaRefundSuccessProps, quotaRefundSuccessSubject, QuotaRefundSuccessTemplate } from '@/templates/quota-refund-success';
import { type VideoApprovalUserProps, videoApprovalUserSubject, VideoApprovalUserTemplate } from '@/templates/video-approval-user';
import { type VideoSubmitSectionProps, videoSubmitSectionSubject, VideoSubmitSectionTemplate } from '@/templates/video-submit-section';
import { type VideoSubmitUserProps, videoSubmitUserSubject, VideoSubmitUserTemplate } from '@/templates/video-submit-user';
import { render } from '@react-email/render';

/* * */

interface EmailTemplate {
	html: string
	subject: string
}

/* * */

export const renderAccountPasswordChangedTemplate = async (props: AccountPasswordChangedProps): Promise<EmailTemplate> => {
	return {
		html: await render(<AccountPasswordChangedTemplate {...props} />),
		subject: accountPasswordChangedSubject,
	};
};

export const renderAccountPasswordResetTemplate = async (props: AccountPasswordResetProps): Promise<EmailTemplate> => {
	return {
		html: await render(<AccountPasswordResetTemplate {...props} />),
		subject: accountPasswordResetSubject,
	};
};

export const renderQuotaActivationFreeTemplate = async (props: QuotaActivationFreeProps): Promise<EmailTemplate> => {
	return {
		html: await render(<QuotaActivationFreeTemplate {...props} />),
		subject: quotaActivationFreeSubject,
	};
};

export const renderQuotaActivationTemplate = async (props: QuotaActivationProps): Promise<EmailTemplate> => {
	return {
		html: await render(<QuotaActivationTemplate {...props} />),
		subject: quotaActivationSubject,
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

export const renderVideoApprovalUserTemplate = async (props: VideoApprovalUserProps): Promise<EmailTemplate> => {
	return {
		html: await render(<VideoApprovalUserTemplate {...props} />),
		subject: videoApprovalUserSubject,
	};
};

export const renderVideoSubmitSectionTemplate = async (props: VideoSubmitSectionProps): Promise<EmailTemplate> => {
	return {
		html: await render(<VideoSubmitSectionTemplate {...props} />),
		subject: videoSubmitSectionSubject,
	};
};

export const renderVideoSubmitUserTemplate = async (props: VideoSubmitUserProps): Promise<EmailTemplate> => {
	return {
		html: await render(<VideoSubmitUserTemplate {...props} />),
		subject: videoSubmitUserSubject,
	};
};

/* * */

export * from '@/templates/signup-affiliate-approval';
export * from '@/templates/signup-affiliate-confirmation';
export * from '@/templates/signup-effective-approval';
export * from '@/templates/signup-effective-confirmation';
export * from '@/templates/signup-effective-sponsor';
