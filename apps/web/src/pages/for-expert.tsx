import { NextPage } from 'next';

import { LinkNextjs } from '../components/container';

const forExpertPage: NextPage = () => {
  return (
    <div className="inset-0">
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-13 p-10 m-5 bg-white border border-gray-200 ">
          <LinkNextjs labelOrElement="団体登録する" url="/org/register" />
          <LinkNextjs labelOrElement="ユーザー登録する" url="/auth/register" />
        </div>
      </div>
    </div>
  );
};

export default forExpertPage;
