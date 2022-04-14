import { NextPage } from 'next';

import { LinkNextjs } from '../components/container';

const ForProfessionalPublicPage: NextPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-1 col-end-13 bg-white border border-gray-200 p-10 m-5 ">
        <LinkNextjs labelOrElement="団体登録する" url="/org/register" />
        <LinkNextjs labelOrElement="ユーザー登録する" url="/auth/register" />
      </div>
    </div>
  );
};

export default ForProfessionalPublicPage;
