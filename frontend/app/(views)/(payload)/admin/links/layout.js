/* * */

import AppAuthenticationCheck from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import BackofficeWrapperLayout from '@/components/BackofficeWrapperLayout/BackofficeWrapperLayout';
import BackofficeLinksList from '@/components/BackofficeLinksList/BackofficeLinksList';

/* * */

export default function Layout({ children }) {
  return (
    <AppAuthenticationCheck scope="users" permission="view" redirect>
      <BackofficeWrapperLayout list={<BackofficeLinksList />} page={children} />
    </AppAuthenticationCheck>
  );
}
