import { FC } from 'react';
import Link from 'next/link';
import { HeaderList, HeaderDropDown, NavAuthSection } from '@next/ui';

export const NavBar: FC = () => {
  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex items-center justify-between">
        <Link href="/" passHref>
          <a href="replace" aria-label="site name" className="inline-flex items-center">
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800">
              くらきち ~くらしのあんぜんきち.vAlpha~
            </span>
          </a>
        </Link>
        <ul className="flex items-center space-x-8 lg:flex">
          <HeaderList linkUrl="/ex/playground" ariaLabel="playground" linkLabel="PlayGround" />
          <HeaderList linkUrl="/howto" ariaLabel="playground" linkLabel="つかいかた" />
          <HeaderList linkUrl="/about-us" ariaLabel="aboutUs" linkLabel="くらきちについて" />
          <HeaderList linkUrl="/for-pro" ariaLabel="forPros" linkLabel="福祉職の皆様へ" />
          <HeaderDropDown />
        </ul>
        <NavAuthSection />
      </div>
    </div>
  );
};
