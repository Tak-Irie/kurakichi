import { useRouter } from 'next/router';
import { FC } from 'react';
import { useUserDeleteMutation } from '../../graphql/generated/graphql';
import { MiddleButton } from '../presentational/atoms/Button';

const UserDeleteButton: FC = () => {
  const [userDelete, { client }] = useUserDeleteMutation();
  const router = useRouter();

  return (
    <MiddleButton
      type="button"
      onClick={async () => {
        await userDelete();
        await client.resetStore();
        router.push('/');
      }}
    >
      Delete your account
    </MiddleButton>
  );
};

export { UserDeleteButton };
