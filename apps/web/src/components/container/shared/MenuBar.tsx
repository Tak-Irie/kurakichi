import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { HeaderList } from './HeaderList';
import { NavAuthSection } from './NavAuthSection';

export const MenuBar: FC = () => (
  <div className="grid grid-cols-12 border border-gray-200">
    <div className="flex col-span-4 col-start-1 items-center ml-2">
      <div className="py-3 -mt-4 -ml-2">
        <Image src="/logo_temp.png" alt="くらきちロゴ" width="50" height="50" />
      </div>
      <div className="absolute">
        <Link href="/" passHref>
          <a
            href="replace"
            aria-label="site name"
            className="inline-flex items-center"
          >
            <div className="ml-6 text-xl font-bold text-gray-800">
              くらきち ~くらしのあんぜんきち~ α版
            </div>
          </a>
        </Link>
      </div>
    </div>
    <ul className="flex col-start-5 col-end-11 justify-around items-center space-x-8">
      <HeaderList
        linkUrl="/menu/howto"
        ariaLabel="howto"
        linkLabel="つかいかた"
        overwriteCSS="hover:underline"
      />
      <HeaderList
        linkUrl="/menu/about-us"
        ariaLabel="aboutUs"
        linkLabel="くらきちについて"
        overwriteCSS="hover:underline"
      />
      <HeaderList
        linkUrl="/menu/for-expert"
        ariaLabel="forExpert"
        linkLabel="福祉職の皆様へ"
        overwriteCSS="hover:underline"
      />
    </ul>
    <div className="flex col-start-12 justify-end items-center mr-2 hover:bg-slate-100 transition ease-in delay-200">
      <NavAuthSection />
    </div>
  </div>
);
