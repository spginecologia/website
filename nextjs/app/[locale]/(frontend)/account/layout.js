/* * */

import FrontendAccount from '@/components/FrontendAccount/FrontendAccount';

/* * */

export default function Layout({ profile, payments, videos }) {
  return (
    <FrontendAccount>
      {profile}
      {payments}
      {videos}
    </FrontendAccount>
  );
}
