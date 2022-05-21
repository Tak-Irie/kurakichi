import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDeleteUserMutation } from '../../../graphql/generated';
import { ButtonBig } from '../../presentational';

const UserDeleteButton: FC = () => {
  const [userDelete, { client }] = useDeleteUserMutation();
  const router = useRouter();

  return (
    <ButtonBig
      type="button"
      onClick={async () => {
        await userDelete();
        await client.resetStore();
        router.push('/');
      }}
      label="Delete your account"
    />
  );
};

export { UserDeleteButton };
