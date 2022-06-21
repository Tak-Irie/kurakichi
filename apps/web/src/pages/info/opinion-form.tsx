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

const OpinionFormPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-2 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="ご意見・ご要望フォーム">
        <p>
          くらきちについてご意見やご要望がございましたら、こちらよりお送り願います。
        </p>
      </Temp>
      <p>製作中・・・</p>
    </div>
  </div>
);

export default OpinionFormPage;
