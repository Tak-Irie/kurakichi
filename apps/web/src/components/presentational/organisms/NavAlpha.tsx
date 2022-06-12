import { FC } from 'react';
import { useGetUserMyInfoQuery } from '../../../graphql';
import { TempLoginButton } from '../../container/user/TempLoginButton';
import { LinkNextjs } from '../atoms';

export const NavAlpha: FC = () => {
  const { data, loading } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-only',
  });

  if (loading) {
    <div>loading...</div>;
  }

  return (
    <div className="flex text-gray-700 bg-red-200 border border-gray-100">
      <LinkNextjs
        labelOrElement="Alpha限定メニュー"
        url="/"
        overwriteCSS="ml-2 text-md"
      />
      <div className="hidden ml-5 space-x-2 w-auto sm:flex">
        <LinkNextjs
          labelOrElement="ビジョンとミッション"
          url="/alpha/vision-mission"
          overwriteCSS="hover:bg-red-300 transition duration-300  rounded px-1"
        />
        <LinkNextjs
          labelOrElement="事業目標と計画"
          url="/alpha/business-goal"
          overwriteCSS="hover:bg-red-300 transition duration-300  rounded px-1"
        />
        <LinkNextjs
          labelOrElement="開発ロードマップ"
          url="/alpha/development-roadmap"
          overwriteCSS="hover:bg-red-300 transition duration-300  rounded px-1"
        />
      </div>
      {data?.getUserByCookie.__typename === 'User' ? (
        <div className="ml-auto">ログイン中</div>
      ) : (
        <TempLoginButton />
      )}
    </div>
  );
};
