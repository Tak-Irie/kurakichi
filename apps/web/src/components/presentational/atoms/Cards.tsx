import Link from 'next/link';
import { FC, ReactNode } from 'react';

type CardProps = {
  id?: string;
  title?: string;
  content?: string;
  linkUrl?: string;
  linkAs?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
};

export const Card: FC<CardProps> = (props) => {
  const { image, title, content, children } = props;
  return (
    <div className="group overflow-hidden relative p-px max-w-lg rounded border shadow-sm hover:shadow-xl transition duration-300 hover:scale-105">
      <div className="absolute bottom-0 left-0 w-full h-1 duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />
      <div className="absolute bottom-0 left-0 w-1 h-full duration-300 scale-y-0 group-hover:scale-y-100 origin-bottom" />
      <div className="absolute top-0 left-0 w-full h-1 duration-300 scale-x-0 group-hover:scale-x-100 origin-right" />
      <div className="absolute right-0 bottom-0 w-1 h-full duration-300 scale-y-0 group-hover:scale-y-100 origin-top" />
      <div className="relative p-5 bg-white rounded-sm">
        <div className="flex flex-col mb-2 lg:flex-row lg:items-center">
          <div className="flex justify-center items-center mr-2 mb-6 w-10 h-10 bg-indigo-50 rounded-full">
            {image || null}
          </div>
          <h6 className="font-semibold leading-5">{title}</h6>
        </div>
        <p className="mb-2 text-sm text-gray-900">{content}</p>
        <div className="inline-flex items-center text-sm font-semibold transition-colors duration-200">
          {children}
        </div>
      </div>
    </div>
  );
};

// FIXME:replace svg to image or builtinIcon
export const SmallCard: FC<CardProps> = ({
  title = 'title',
  content = 'content',
  // image = undefined,
  id,
  children,
}) => (
  <li key={id}>
    <div className="flex items-center p-3 m-2 max-w-lg bg-gray-200 border-2 border-red-900">
      <div className="flex justify-center items-center mr-5 w-16 h-16 bg-yellow-100 rounded-full">
        <svg
          className="w-16 h-12 text-red-300"
          stroke="currentColor"
          viewBox="0 0 52 52"
        >
          <polygon
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            points="29 13 14 29 25 29 23 39 38 23 27 23"
          />
        </svg>
      </div>
      <div>
        <h6 className="mb-2 font-semibold leading-5">{title}</h6>
        <p className="mb-3 text-sm text-gray-900">{content}</p>
        {children}
      </div>
    </div>
  </li>
);

export const CardWithPick: FC<CardProps> = ({
  content,
  image,
  imageAlt,
  linkUrl = '/',
  title,
}) => (
  <div className="flex relative items-center py-5 px-6 space-x-3 bg-white rounded-lg border border-gray-300 hover:border-gray-400 focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 shadow-sm">
    <div className="shrink-0">
      <img className="w-10 h-10 rounded-full" src={image} alt={imageAlt} />
    </div>
    <div className="flex-1 min-w-0">
      <Link href={linkUrl} passHref>
        <a href="replace" className="focus:outline-none">
          <div className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500 truncate">{content}</p>
        </a>
      </Link>
    </div>
  </div>
);
