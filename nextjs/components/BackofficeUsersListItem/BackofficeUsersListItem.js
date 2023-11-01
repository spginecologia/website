import { useParams } from 'next/navigation';
import { useRouter } from 'next-intl/client';
import { useTranslations } from 'next-intl';
import BackofficeWrapperListItem from '@/components/BackofficeWrapperListItem/BackofficeWrapperListItem';
import Text from '@/components/Text/Text';
import Badge from '@/components/Badge/Badge';
import { Group } from '@mantine/core';

export default function BackofficeUsersListItem({ _id, name, email }) {
  //

  const router = useRouter();
  const { user_id } = useParams();
  const t = useTranslations('users');

  const handleClick = () => {
    if (user_id === _id) return;
    router.push(`/admin/users/${_id}`);
  };

  return (
    <BackofficeWrapperListItem onClick={handleClick} isSelected={user_id === _id} withChevron>
      {/* <Text size="title" style={!name && 'untitled'}>
        {name || t('untitled')}
      </Text> */}
      <Group>
        <Badge>{email}</Badge>
      </Group>
    </BackofficeWrapperListItem>
  );
}
