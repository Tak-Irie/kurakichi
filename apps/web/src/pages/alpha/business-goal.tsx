import { NextPage } from 'next';
import { FC, ReactNode } from 'react';

type TempProps = {
  title: string;
  children?: ReactNode;
};
type TempListProps = {
  title: string;
  list: string[];
};
const Temp: FC<TempProps> = ({ children, title }) => (
  <div>
    <p className="mt-2 text-lg font-bold underline">{title}</p>
    <div className="text-base">{children}</div>
  </div>
);
const TempList: FC<TempListProps> = ({ list, title }) => (
  <div>
    <p className="mt-2 text-lg font-bold underline">{title}</p>
    <ul className="ml-4 text-base list-disc">
      {list!.map((li) => (
        <li key={li}>{li}</li>
      ))}
    </ul>
  </div>
);

const AlphaBusinessGoalPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-4 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="事業目標と計画">
        <p className="max-w-2xl">
          このページは、くらきちの短中長期の事業目標と計画を記述しています。
          <br />
          ※製作中
        </p>
      </Temp>
      <TempList title="長期目標 ~10年" list={['']} />
      <TempList title="中期目標 ~5年" list={['']} />
      <TempList title="短期目標 ~3年" list={['']} />
    </div>
  </div>
);

export default AlphaBusinessGoalPage;
