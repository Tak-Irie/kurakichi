import { ReactElement, VFC } from 'react';

import { TextH3, TextBase } from '@next/ui';
import { LinkNextjs } from '@next/container';

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
  linkLabel = '詳しく見る',
  imageAlt = 'articleImage',
  imageSrc = '/logo_temp.png',
}) => {
  return (
    <div className="transition-shadow duration-300 bg-white rounded shadow-sm">
      <img src={imageSrc} alt={imageAlt} className="object-cover w-full h-64" />
      <div className="p-5 border border-t-0">
        {category ? (
          <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
            <p className="" aria-label="Category">
              {category}
            </p>
            {date ? <span className="text-gray-600">{date}</span> : null}
          </p>
        ) : null}
        <TextH3 content={title} />
        {typeof description === 'string' ? <TextBase content={description} /> : description}
        <LinkNextjs linkUrl={linkUrl} linkAs={linkAs} linkLabel={linkLabel} />
      </div>
    </div>
  );
};
