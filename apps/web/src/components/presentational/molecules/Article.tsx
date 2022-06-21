import { FC, ReactElement } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { TextBase, TextH3 } from '../atoms';

type ArticleProps = {
  title: string;
  description: string | ReactElement;
  linkUrl: string;
  imageSrc?: string;
  imageAlt?: string;
};

export const Article: FC<ArticleProps> = ({
  title,
  description,
  linkUrl,
  imageAlt = 'articleImage',
  imageSrc = '/logo_temp.png',
}) => {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.push(linkUrl)}>
      <div className="flex flex-col justify-start h-[500px] bg-white hover:bg-slate-100 rounded border border-gray-200 shadow">
        <div className="relative w-full h-64">
          <Image
            src={imageSrc}
            alt={imageAlt}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col items-start truncate">
          <div className="ml-3">
            <TextH3 content={title} />
          </div>
          {typeof description === 'string' ? (
            <TextBase content={description} />
          ) : (
            description
          )}
        </div>
      </div>
    </button>
  );
};
