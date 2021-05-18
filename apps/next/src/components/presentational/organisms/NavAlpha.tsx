import { FC } from 'react';

import { LinkNextjs } from '@next/container';

export const NavAlpha: FC = () => {
  return (
    <div className="flex bg-red-200 text-gray-700 border border-gray-100">
      <LinkNextjs linkLabel="Alpha限定メニュー" linkUrl="/" overwriteCSS="ml-2 text-md" />
      <div className="hidden sm:flex ml-5 w-auto space-x-2">
        <LinkNextjs
          linkLabel="製作動機"
          linkUrl="/alpha/motivation"
          overwriteCSS="hover:bg-red-300 transition duration-300  rounded px-1"
        />
        <LinkNextjs
          linkLabel="目的"
          linkUrl="/alpha/goal"
          overwriteCSS="hover:bg-red-300 transition duration-300  rounded px-1"
        />
        <LinkNextjs
          linkLabel="実装ロードマップ"
          linkUrl="/alpha/load-map"
          overwriteCSS="hover:bg-red-300 transition duration-300  rounded px-1"
        />
      </div>
      <div className="hover:bg-red-300 transition duration-200 px-1 ml-auto mr-2 rounded">
        <LinkNextjs linkLabel="簡易ログイン" linkUrl="/" />
      </div>
    </div>
  );
};
