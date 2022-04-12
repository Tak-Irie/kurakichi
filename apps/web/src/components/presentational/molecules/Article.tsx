import { ReactElement, VFC } from 'react';
import Image from 'next/image';

import { TextH3, TextBase } from '..';
import { LinkNextjs } from '../../container';

type ArticleProps = {
  title: string;
  description: string | ReactElement;
  linkUrl: string;
  linkLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  date?: string;
  category?: string;
  linkAs?: string;
};

export const Article: VFC<ArticleProps> = ({
  title,
  description,
  linkUrl,
  linkAs,
  date,
  category,
  linkLabel = 'くわしく',
  imageAlt = 'articleImage',
  imageSrc = '/logo_temp.png',
}) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded shadow">
      <img className="h-72 object-cover" src={imageSrc} alt={imageAlt} />
      <div className="p-5 space-y-2 flex flex-col h-full">
        {category ? (
          <p className="mb-3 text-xs font-semibold">
            <p className="" aria-label="Category">
              {category}
            </p>
            {date ? <span className="text-gray-600">{date}</span> : null}
          </p>
        ) : null}
        <TextH3 content={title} />
        {typeof description === 'string' ? <TextBase content={description} /> : description}
        <div className="flex justify-end items-end h-full">
          <LinkNextjs url={linkUrl} as={linkAs} labelOrElement={linkLabel} />
        </div>
      </div>
    </div>
  );
};
