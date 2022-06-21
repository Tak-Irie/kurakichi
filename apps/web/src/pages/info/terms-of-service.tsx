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

const TermsOfServicePage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-2 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="くらきち利用規約">
        <p className="p-1 mt-4 w-fit bg-red-100 rounded-md">
          製作中・・・サービスリリースの際に、くらきちが備える機能に基づいたものを記述する
        </p>
      </Temp>
    </div>
  </div>
);

export default TermsOfServicePage;
