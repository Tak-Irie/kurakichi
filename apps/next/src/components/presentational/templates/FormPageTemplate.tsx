import { ReactElement, VFC } from 'react';

import { ImageLogo, TextH2 } from '@next/ui';

type FormPageTemplateProps = {
  formTitle: string;
  formContent: ReactElement;
};

export const FormPageTemplate: VFC<FormPageTemplateProps> = ({ formContent, formTitle }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-end-10 bg-white p-8 shadow my-4">
        <div className="grid grid-cols-4">
          <ImageLogo src="/logo_temp.png" alt="くらきちロゴ" css="bg-yellow-50 rounded-full" />
          <div className="col-start-2 col-span-2 flex items-center">
            <TextH2 content={formTitle} />
          </div>
        </div>
        <div className="mt-10">{formContent}</div>
      </div>
    </div>
  );
};
