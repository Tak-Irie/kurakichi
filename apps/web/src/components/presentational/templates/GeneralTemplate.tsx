import { ReactElement, VFC } from 'react';

import { ImageLogo, TextH2 } from '..';

type GeneralTemplateProps = {
  title: string;
  content: ReactElement;
};

export const GeneralTemplate: VFC<GeneralTemplateProps> = ({ content, title }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-end-12 bg-white p-8 shadow my-4">
        <div className="grid grid-cols-8">
          <ImageLogo src="/logo_temp.png" alt="くらきちロゴ" css="bg-yellow-50 rounded-full" />
          <div className="flex col-span-5 items-center">
            <TextH2 content={title} />
          </div>
        </div>
        <div className="mt-10">{content}</div>
      </div>
    </div>
  );
};
