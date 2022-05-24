import { FC } from 'react';
import { TextH2 } from '../atoms';
import { HelperPop } from './HelperPop';

// TODO:ask for pro
export const UseCasePresenter: FC = () => (
    <div className="col-start-2 col-end-12 p-5 my-10 bg-white border border-gray-200 shadow-sm">
      <div className="flex justify-items-start">
        <TextH2 content="ユースケース紹介" />
        <span className="flex items-center">
          <HelperPop
            text="どのような支援を受けられるか、実際の具体例を参考にしてみましょう"
          />
        </span>
      </div>
      <div>
        <p>作成中</p>
      </div>
    </div>
  );
