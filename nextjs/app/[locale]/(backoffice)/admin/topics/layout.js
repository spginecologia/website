/* * */

import AuthGate from '@/components/AuthGate/AuthGate';
import BackofficeWrapperLayout from '@/components/BackofficeWrapperLayout/BackofficeWrapperLayout';
import BackofficeTopicsList from '@/components/BackofficeTopicsList/BackofficeTopicsList';

/* * */

export default function Layout({ children }) {
  return (
    <AuthGate scope="users" permission="view" redirect>
      <BackofficeWrapperLayout list={<BackofficeTopicsList />} page={children} />
    </AuthGate>
  );
}
