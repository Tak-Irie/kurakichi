import { useRouter } from 'next/router';
import { FC } from 'react';
import { useUserDeleteMutation } from '../../graphql/generated/graphql';
import { ButtonBig } from '../presentational';

const UserDeleteButton: FC = () => {
  const [userDelete, { client }] = useUserDeleteMutation();
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
