import { FC, ReactElement } from 'react';

import { ImageLogo, TextH2 } from '../atoms';

type FormPageTemplateProps = {
  title: string;
  content: ReactElement;
};

export const FormPageTemplate: FC<FormPageTemplateProps> = ({
  content,
  title,
}) => (
  <div className="grid grid-cols-12">
    <div className="col-start-4 col-end-10 p-8 my-4 bg-white shadow">
      <div className="grid grid-cols-4">
        <ImageLogo
          src="/logo_temp.png"
          alt="くらきちロゴ"
          css="bg-yellow-50 rounded-full"
        />
        <div className="flex col-span-2 col-start-2 items-center">
          <TextH2 content={title} />
        </div>
      </div>
      <div className="mt-10">{content}</div>
    </div>
  </div>
);
