/* * */

import { type Payment, PaymentStatus } from '@mollie/api-client';

/**
 * This function checks if a Mollie payment has been refunded.
 * It returns true if the payment is refunded, otherwise false.
 * It also logs the payment data for debugging purposes.
 * @param paymentData The Mollie payment data to check.
 * @returns boolean indicating if the payment is refunded.
 */
export function mollieIsRefunded(paymentData: Payment): boolean {
	//

	//
	// Only paid payments can be refunded,
	// so we check if the payment status is 'paid'.

	const isPaid = paymentData.status === PaymentStatus.paid;

	if (!isPaid) {
		console.log(`Payment ID "${paymentData.id}" is not paid: FALSE`);
		return false;
	}

	//
	// Check if the payment has been refunded by checking the amountRefunded field.
	// If the amountRefunded is present and greater than zero, it means the payment has been refunded.

	const hasRefundedAmount = paymentData.amountRefunded && paymentData.amountRefunded.value;
	const refundedAmountIsZero = hasRefundedAmount && paymentData.amountRefunded.value === '0.00';
	const refundedAmountEqualsPaymentAmount = hasRefundedAmount && paymentData.amountRefunded.value === paymentData.amount.value;

	if (hasRefundedAmount && !refundedAmountIsZero && refundedAmountEqualsPaymentAmount) {
		console.log(`Payment ID "${paymentData.id}" has been refunded: TRUE`);
		return true;
	}

	//
	// Always return false if the payment is not refunded.

	return false;

	//
}
