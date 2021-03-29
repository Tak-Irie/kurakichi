import { FC } from 'react';

import { useUserMeQuery } from '../../../graphql/generated/graphql';
import { isServer } from '../../../util/isServer';
import { MiddleButton } from '../atoms/Button';
import { LoadingStylishSpinner } from '../atoms/LoadingSpinner';
import Link from 'next/link';
import { LogoutButton } from '../../container/LogoutButton';

const NavAuthSection: FC = () => {
  const { data, loading } = useUserMeQuery({
    skip: isServer(),
  });

  if (loading)
    return (
      <div>
        <LoadingStylishSpinner />
      </div>
    );

  if (!data?.me.user)
    return (
      <Link href="/login">
        <a
          href="/login"
          className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          Login
        </a>
      </Link>
    );

  return (
    <>
      <div>
        <p>{data.me.user.username}さん</p>
        <Link href="/private">
          <a href="/private">マイページ</a>
        </Link>
      </div>
      <LogoutButton />
    </>
  );
};

export { NavAuthSection };
