'use client';

import { useState } from 'react';

import CustomDonationInput from '@/components/CustomDonationInput';

import { formatAmountForDisplay } from '@/services/stripe-helpers';
import { createCheckoutSession } from '@/services/stripe-action';

export default function FrontendAccountPaymentsCheckout() {
  const [loading] = useState(false);
  const [input, setInput] = useState({
    customDonation: Math.round(),
  });

  const handleInputChange = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  return (
    <form action={createCheckoutSession}>
      <CustomDonationInput className="checkout-style" name="customDonation" min={0} max={100} step={5} currency={'EUR'} onChange={handleInputChange} value={input.customDonation} />
      <button className="checkout-style-background" type="submit" disabled={loading}>
        Donate {formatAmountForDisplay(input.customDonation, 'EUR')}
      </button>
    </form>
  );
}
