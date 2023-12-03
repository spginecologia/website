/* * */

import FrontendAccount from '@/components/FrontendAccount/FrontendAccount';

/* * */

export default function Layout({ profile, subscription, videos }) {
  return (
    <FrontendAccount>
      {profile}
      {subscription}
      {videos}
    </FrontendAccount>
  );
}
