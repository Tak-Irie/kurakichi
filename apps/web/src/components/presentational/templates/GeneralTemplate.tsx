import { FC, ReactElement } from 'react';

import { ImageLogo, TextH2 } from '../atoms';

type GeneralTemplateProps = {
  title: string;
  content: ReactElement;
};

export const GeneralTemplate: FC<GeneralTemplateProps> = ({
  content,
  title,
}) => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 bg-white shadow">
      <div className="grid grid-cols-8">
        <ImageLogo
          src="/logo_temp.png"
          alt="くらきちロゴ"
          css="bg-yellow-50 rounded-full"
        />
        <div className="flex col-span-5 items-center">
          <TextH2 content={title} />
        </div>
      </div>
      <div className="mt-10">{content}</div>
    </div>
  </div>
);
