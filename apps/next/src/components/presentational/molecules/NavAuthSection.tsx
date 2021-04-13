import { FC } from 'react';
import Link from 'next/link';

import { useMeQuery } from '../../../graphql/generated/graphql';
import { isServer } from '../../../util/isServer';
import { LoadingStylishSpinner } from '@next/ui';
import { LogoutButton } from '@next/container';

const NavAuthSection: FC = () => {
  const { data, loading } = useMeQuery({
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
      <div>
        <Link href="/login">
          <a
            href="/login"
            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Login
          </a>
        </Link>
      </div>
    );

  return (
    <>
      <div>
        <p>{data.me.user.userName}さん</p>
        <Link href="/myPage">
          <a href="/myPage">マイページ</a>
        </Link>
      </div>
      <LogoutButton />
    </>
  );
};

export { NavAuthSection };
