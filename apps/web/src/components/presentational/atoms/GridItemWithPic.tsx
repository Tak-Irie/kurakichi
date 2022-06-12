import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type GridItemWithPicProps = {
  name: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
  linkUrl: string;
  linkAs?: string;
};

export const GridItemWithPic: FC<GridItemWithPicProps> = (props) => {
  const { description, imgSrc, name, imgAlt, linkUrl, linkAs } = props;
  return (
    <div className="flex relative items-center py-5 px-6 space-x-3 bg-white rounded-lg border border-gray-300 hover:border-gray-400 focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 shadow-sm">
      <div className="shrink-0">
        <Image
          className="rounded-full"
          width={40}
          height={40}
          src={imgSrc}
          alt={imgAlt}
        />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={linkUrl} as={linkAs} passHref>
          <a href="replace" className="focus:outline-none">
            <div className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-sm text-gray-500 truncate">{description}</p>
          </a>
        </Link>
      </div>
    </div>
  );
};
