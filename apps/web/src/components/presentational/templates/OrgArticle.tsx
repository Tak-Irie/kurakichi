import { FC, ReactElement } from 'react';

import { TextH2 } from '..';

type GeneralTemplateProps = {
  title: string;
  content: ReactElement;
};

export const OrgArticle: FC<GeneralTemplateProps> = ({ content, title }) => {
  return (
    <div className="p-8 my-4 bg-white shadow">
      <div className="flex col-span-5 items-center">
        <TextH2 content={title} />
      </div>
      <div className="mt-10">{content}</div>
    </div>
  );
};
