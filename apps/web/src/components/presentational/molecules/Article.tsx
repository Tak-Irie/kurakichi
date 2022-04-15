import { ReactElement, VFC } from 'react';

import { TextBase, TextH3 } from '..';
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
    <div className="flex flex-col bg-white rounded border border-gray-200 shadow">
      <img className="object-cover h-72" src={imageSrc} alt={imageAlt} />
      <div className="flex flex-col p-5 space-y-2 h-full">
        {category != null ? (
          <p className="mb-3 text-xs font-semibold">
            <p className="" aria-label="Category">
              {category}
            </p>
            {date != null ? (
              <span className="text-gray-600">{date}</span>
            ) : null}
          </p>
        ) : null}
        <TextH3 content={title} />
        {typeof description === 'string' ? (
          <TextBase content={description} />
        ) : (
          description
        )}
        <div className="flex justify-end items-end h-full">
          <LinkNextjs url={linkUrl} as={linkAs} labelOrElement={linkLabel} />
        </div>
      </div>
    </div>
  );
};