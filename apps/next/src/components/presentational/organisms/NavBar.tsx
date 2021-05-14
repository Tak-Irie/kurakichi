import { FC } from 'react';
import Link from 'next/link';
import { HeaderList, HeaderDropDown, NavAuthSection } from '@next/ui';

export const NavBar: FC = () => {
  return (
    <div className="px-4 py-5 grid grid-cols-12">
      <span className="col-start-1 col-span-4">
        <Link href="/" passHref>
          <a href="replace" aria-label="site name" className="inline-flex items-center">
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800">
              くらきち ~くらしのあんぜんきち.vAlpha~
            </span>
          </a>
        </Link>
      </span>
      <ul className="col-start-5 col-end-10 flex justify-between items-center space-x-8">
        <HeaderList linkUrl="/ex/playground" ariaLabel="playground" linkLabel="PlayGround" />
        <HeaderList linkUrl="/howto" ariaLabel="playground" linkLabel="つかいかた" />
        <HeaderList linkUrl="/about-us" ariaLabel="aboutUs" linkLabel="くらきちについて" />
        <HeaderList linkUrl="/for-pro" ariaLabel="forPros" linkLabel="福祉職の皆様へ" />
        <HeaderDropDown />
      </ul>
      <span className="col-start-11 flex justify-end">
        <NavAuthSection />
      </span>
    </div>
  );
};
