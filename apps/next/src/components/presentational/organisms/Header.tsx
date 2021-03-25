import { FC } from 'react';
import Link from 'next/link';
import { HeaderList } from '../atoms/HeaderList';
import { SingUpButton } from '../../container/SingUp';
import { HeaderDropDown } from '../molecules/HeaderDropDown';

// FIXME:rename to NavBar
const Header: FC = () => {
  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <Link href="/">
          <a href="/" aria-label="Company" title="Company" className="inline-flex items-center">
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              くらきち ｰ くらしのあんぜんきち_アルファ版 -
            </span>
          </a>
        </Link>
        <ul className="flex items-center space-x-8 lg:flex">
          <HeaderList href="/product" title="our product" label="Product" />
          <HeaderList href="/users" title="users" label="users" />
          <HeaderList href="/login" title="login" label="login" />
          <HeaderList href="/private" title="private" label="private" />
          <li>
            <SingUpButton />
            <HeaderDropDown />
          </li>
        </ul>
      </div>
    </div>
  );
};

export { Header };
