import { VFC } from 'react';
import Link from 'next/link';

type GridItemWithPicProps = {
  name: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
  linkUrl: string;
  linkAs?: string;
};

export const GridItemWithPic: VFC<GridItemWithPicProps> = (props) => {
  const { description, imgSrc, name, imgAlt, linkUrl, linkAs } = props;
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={imgSrc} alt={imgAlt} />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={linkUrl} as={linkAs} passHref>
          <a href="replace" className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true"></span>
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-sm text-gray-500 truncate">{description}</p>
          </a>
        </Link>
      </div>
    </div>
  );
};
