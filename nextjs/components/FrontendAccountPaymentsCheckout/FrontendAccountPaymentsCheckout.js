'use client';

/* * */

import { useState } from 'react';
import { useSession } from 'next-auth/react';

/* * */

export default function FrontendAccountPaymentsCheckout() {
  //

  //
  // A. Setup variables

  const [loading] = useState(false);
  const { data: sessionData } = useSession();

  //
  // B. Fetch data

  //
  // C. Handle actions

  //
  // D. Render components

  return (
    <form action={`/api/users/subscription/renew`}>
      <button className="checkout-style-background" type="submit" disabled={loading}>
        Renovar Subscrição 30€
      </button>
    </form>
  );

  //
}
