import { ReactElement, VFC } from 'react';

import { ImageLogo, TextH2 } from '..';

type GeneralTemplateProps = {
  title: string;
  content: ReactElement;
};

export const OrgService: VFC<GeneralTemplateProps> = ({ content, title }) => {
  return (
    <div className="bg-white p-8 shadow my-4">
      <div className="flex col-span-5 items-center">
        <TextH2 content={title} />
      </div>
      <div className="mt-10">{content}</div>
    </div>
  );
};
