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

const QuestionAndAnswerPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-4 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="Q&amp;A">
        <p className="max-w-2xl">
          このページは、くらきちのご利用に関するご質問にお答えしています。
        </p>
      </Temp>
      <p>製作中・・・</p>
    </div>
  </div>
);

export default QuestionAndAnswerPage;
