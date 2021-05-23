import { ReactElement, VFC } from 'react';

import { ImageLogo, TextH2 } from '../../presentational';

type GeneralTemplateProps = {
  formTitle: string;
  formContent: ReactElement;
};

export const GeneralTemplate: VFC<GeneralTemplateProps> = ({ formContent, formTitle }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-end-12 bg-white p-8 shadow my-4">
        <div className="grid grid-cols-8">
          <ImageLogo src="/logo_temp.png" alt="くらきちロゴ" css="bg-yellow-50 rounded-full" />
          <div className="flex col-span-5 items-center">
            <TextH2 content={formTitle} />
          </div>
        </div>
        <div className="mt-10">{formContent}</div>
      </div>
    </div>
  );
};
