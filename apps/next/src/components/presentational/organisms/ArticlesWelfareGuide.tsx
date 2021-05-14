import { VFC } from 'react';

import { Article } from '@next/ui';

type ArticlesWelfareGuideProps = {
  some?: string;
};

export const ArticlesWelfareGuide: VFC<ArticlesWelfareGuideProps> = ({ some }) => {
  return (
    <div className="grid grid-cols-3 gap-8 mt-10 max-w-full">
      <Article title="暮らし" description="テスト本文" linkUrl="/guide/life" />
      <Article title="仕事・失業" description="テスト本文" linkUrl="/guide/work" />
      <Article title="医療・障害" description="テスト本文" linkUrl="/guide/medical" />
      <Article title="妊娠・出産・育児" description="テスト本文" linkUrl="/guide/child" />
      <Article title="年金" description="テスト本文" linkUrl="/guide/pension" />
      <Article title="法律" description="テスト本文" linkUrl="/guide/law" />
    </div>
  );
};
