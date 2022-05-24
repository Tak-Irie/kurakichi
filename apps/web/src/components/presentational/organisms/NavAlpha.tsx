import { FC } from 'react';
import { LinkNextjs } from '../atoms';

export const NavAlpha: FC = () => (
  <div className="flex text-gray-700 bg-red-200 border border-gray-100">
    <LinkNextjs
      labelOrElement="Alpha限定メニュー"
      url="/"
      overwriteCSS="ml-2 text-md"
    />
    <div className="hidden ml-5 space-x-2 w-auto sm:flex">
      <LinkNextjs
        labelOrElement="製作動機"
        url="/alpha/motivation"
        overwriteCSS="hover:bg-red-300 transition duration-300  rounded px-1"
      />
      <LinkNextjs
        labelOrElement="目的"
        url="/alpha/goal"
        overwriteCSS="hover:bg-red-300 transition duration-300  rounded px-1"
      />
      <LinkNextjs
        labelOrElement="実装ロードマップ"
        url="/alpha/load-map"
        overwriteCSS="hover:bg-red-300 transition duration-300  rounded px-1"
      />
    </div>
    <div className="px-1 mr-2 ml-auto hover:bg-red-300 rounded transition duration-200">
      <LinkNextjs labelOrElement="簡易ログイン" url="/" />
    </div>
  </div>
);
