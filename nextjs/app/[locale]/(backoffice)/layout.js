'use client';

/* * */

import { useSession } from 'next-auth/react';
import BackofficeWrapper from '@/components/BackofficeWrapper/BackofficeWrapper';

/* * */

export default function Layout({ children }) {
  //

  //
  // A. Handle session

  const { status: sessionStatus } = useSession({
    required: true,
    onUnauthenticated() {
      if (!window.location.pathname || window.location.pathname === '/') window.location = '/login';
      else window.location = `/login?callbackUrl=${window.location.pathname}`;
    },
  });

  //
  // B. Render components

  return sessionStatus === 'authenticated' ? <BackofficeWrapper>{children}</BackofficeWrapper> : <Loader visible fill />;

  //
}
