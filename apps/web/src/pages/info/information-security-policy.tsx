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

const InformationSecurityPolicyPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-2 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="くらきち情報セキュリティポリシー">
        <div>
          <p>以下の規格・標準に従ったものを記載予定</p>
          <br />
          <p>NIST SP800-171 rev5</p>
          <p>OWASP ASVS v4.0.3</p>
          <p>
            医療情報システムの安全管理に関するガイドライン 第5.2版（令和4年3月）
          </p>
          <br />
          <p>
            ※ NIST SP800ｰ53 rev5 及び
            SP800-207について、順次採用していけるか検討中
          </p>
        </div>
      </Temp>
    </div>
  </div>
);

export default InformationSecurityPolicyPage;
