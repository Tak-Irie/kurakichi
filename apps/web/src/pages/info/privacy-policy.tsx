import type { NextPage } from 'next';
import { FC, ReactNode } from 'react';

type TempProps = {
  title: string;
  children?: ReactNode;
};
const Temp: FC<TempProps> = ({ children, title }) => (
  <div>
    <p className="mt-2 text-lg font-bold underline">{title}</p>
    <div className="text-base">{children}</div>
  </div>
);

const PrivacyPolicyPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-2 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="くらきちプライバシーポリシー">
        <div>
          <p>以下の法令・規則を遵守したものを記載予定</p>
          <br />
          <p>
            個人情報保護法(デジタル社会の形成を図るための関係法律の整備に関する法律
            (令和三年法律第三十七号))
          </p>
          <p>EU一般データ保護規則(GDPR)</p>
          <p>
            公益社団法人 全日本病院協会 みんなの医療ガイド
            プライバシー尊重と個人情報保護
          </p>
        </div>
      </Temp>
    </div>
  </div>
);

export default PrivacyPolicyPage;
