import { FC, ReactElement } from 'react';

import { TextH2 } from '../atoms';

type GeneralTemplateProps = {
  title: string;
  content: ReactElement;
};

export const OrgService: FC<GeneralTemplateProps> = ({ content, title }) => (
  <>
    <div className="flex col-span-5 items-center">
      <TextH2 content={title} />
    </div>
    <div className="mt-10">{content}</div>
  </>
);
