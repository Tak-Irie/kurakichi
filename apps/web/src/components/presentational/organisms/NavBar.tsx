import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { HeaderList, NavAuthSection } from '..';

export const NavBar: FC = () => {
  return (
    <div className="grid grid-cols-12 py-5 border border-gray-200">
      <div className="flex col-span-4 col-start-1 items-center ml-2">
        <div className="-mt-5 -ml-2">
          <Image
            src="/logo_temp.png"
            alt="くらきちロゴ"
            width="50"
            height="50"
          />
        </div>
        <div className="absolute">
          <Link href="/" passHref>
            <a
              href="replace"
              aria-label="site name"
              className="inline-flex items-center"
            >
              <span className="ml-6 text-xl font-bold text-gray-800">
                くらきち ~くらしのあんぜんきち.Alpha~
              </span>
            </a>
          </Link>
        </div>
      </div>
      <ul className="flex col-start-5 col-end-11 justify-around items-center space-x-8">
        <HeaderList
          linkUrl="/howto"
          ariaLabel="playground"
          linkLabel="つかいかた"
        />
        <HeaderList
          linkUrl="/about-us"
          ariaLabel="aboutUs"
          linkLabel="くらきちについて"
        />
        <HeaderList
          linkUrl="/for-pro"
          ariaLabel="forPros"
          linkLabel="福祉職の皆様へ"
        />
      </ul>
      <span className="flex  col-start-12 justify-end mr-2">
        <NavAuthSection />
      </span>
    </div>
  );
};
