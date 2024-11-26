/* * */

import AppAuthenticationCheck from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import BackofficeWrapperLayout from '@/components/BackofficeWrapperLayout/BackofficeWrapperLayout';
import BackofficeGuidelinesList from '@/components/BackofficeGuidelinesList/BackofficeGuidelinesList';

/* * */

export default function Layout({ children }) {
  return (
    <AppAuthenticationCheck scope="users" permission="view" redirect>
      <BackofficeWrapperLayout list={<BackofficeGuidelinesList />} page={children} />
    </AppAuthenticationCheck>
  );
}
