import { VFC } from 'react';

import { TextH2, HelperPop } from '@next/ui';

type UseCasePresenterProps = {
  some?: string;
};

// TODO:ask for pro
export const UseCasePresenter: VFC<UseCasePresenterProps> = ({ some }) => {
  return (
    <div className="col-start-2 col-end-12 my-10 bg-white p-5 border-gray-200 border shadow-sm">
      <div className="flex justify-items-start">
        <TextH2 content="ユースケース紹介" />
        <span className="flex items-center">
          <HelperPop text={'どのような支援を受けられるか、実際の具体例を参考にしてみましょう'} />
        </span>
      </div>
      <div>
        <p>作成中</p>
      </div>
    </div>
  );
};
