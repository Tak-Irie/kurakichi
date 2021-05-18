import { FC, ReactElement, VFC } from 'react';
import Link from 'next/link';

type CardProps = {
  id?: string;
  title?: string;
  content?: string;
  linkUrl?: string;
  linkAs?: string;
  image?: string;
  imageAlt?: string;
};

export const Card: FC<CardProps> = (props) => {
  const { image, title, content, children } = props;
  return (
    <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl max-w-lg">
      <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
      <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
      <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
      <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
      <div className="relative p-5 bg-white rounded-sm">
        <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
          <div className="flex items-center justify-center w-10 h-10 mb-6 mr-2 rounded-full bg-indigo-50">
            {image || null}
          </div>
          <h6 className="font-semibold leading-5">{title}</h6>
        </div>
        <p className="mb-2 text-sm text-gray-900">{content}</p>
        <div className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">
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
  image = undefined,
  id,
  children,
}) => {
  return (
    <li key={id}>
      <div className="flex bg-gray-200 p-3 m-2 max-w-lg items-center border-2 border-red-900">
        <div className="flex items-center justify-center w-16 h-16 mr-5 rounded-full bg-yellow-100">
          <svg className="w-16 h-12 text-red-300" stroke="currentColor" viewBox="0 0 52 52">
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
};

export const CardWithPick: VFC<CardProps> = ({
  content,
  image,
  imageAlt,
  linkUrl = '/',
  linkAs = '/',
  title,
}) => {
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={image} alt={imageAlt} />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={linkUrl} as={linkAs} passHref>
          <a href="replace" className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true"></span>
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="text-sm text-gray-500 truncate">{content}</p>
          </a>
        </Link>
      </div>
    </div>
  );
};
