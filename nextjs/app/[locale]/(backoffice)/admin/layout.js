'use client';

/* * */

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BackofficeWrapper from '@/components/BackofficeWrapper/BackofficeWrapper';

/* * */

export default function Layout({ children }) {
  //

  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated() {
      router.push(`/login?callbackUrl=${window.location.pathname}`);
    },
  });

  return <BackofficeWrapper>{children}</BackofficeWrapper>;
}
