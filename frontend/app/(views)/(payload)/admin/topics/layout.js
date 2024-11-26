/* * */

import AppAuthenticationCheck from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import BackofficeWrapperLayout from '@/components/BackofficeWrapperLayout/BackofficeWrapperLayout';
import BackofficeTopicsList from '@/components/BackofficeTopicsList/BackofficeTopicsList';

/* * */

export default function Layout({ children }) {
  return (
    <AppAuthenticationCheck scope="users" permission="view" redirect>
      <BackofficeWrapperLayout list={<BackofficeTopicsList />} page={children} />
    </AppAuthenticationCheck>
  );
}
