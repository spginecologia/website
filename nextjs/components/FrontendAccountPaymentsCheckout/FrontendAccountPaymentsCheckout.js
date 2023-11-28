'use client';

/* * */

import { useState } from 'react';
import { createCheckoutSession } from '@/services/stripe-action';

/* * */

export default function FrontendAccountPaymentsCheckout() {
  //

  //
  // A. Setup variables

  const [loading] = useState(false);

  //
  // B. Fetch data

  //
  // C. Handle actions

  //
  // D. Render components

  return (
    <form action={createCheckoutSession}>
      <button className="checkout-style-background" type="submit" disabled={loading}>
        Renovar Subscrição 30€
      </button>
    </form>
  );

  //
}
