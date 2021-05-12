import { NextPage } from 'next';

import { OrgRegisterForm, LinkNextjs } from '@next/container';

const ForProfessionalPublicPage: NextPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-3 col-end-11">
        <LinkNextjs linkLabel="団体登録ページへ" linkUrl="/org/register" />
      </div>
    </div>
  );
};

export default ForProfessionalPublicPage;
