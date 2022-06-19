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
        </p>
      </Temp>
      <TempList
        title="長期目標 ~10年"
        list={[
          '総合病院・大学・県/国家レベルの組織にソフトウェアを提供する。',
          '自主事業による売上のみで、運営可能な組織にする。',
        ]}
      />
      <TempList
        title="中期目標 ~5年"
        list={[
          '実用に耐え、需要を満たすプロダクトを製作する。',
          '寄付金や補助金を獲得する。',
          '小中規模の福祉団体・医療機関・学校・自治体にソフトウェアを提供する。',
        ]}
      />
      <TempList
        title="短期目標 ~3年"
        list={[
          '賛同者を集める。',
          'NPO法人を設立する。',
          '既存の福祉団体とコミュニケーションを図る。',
          '現状に足りていない部分を十分にヒアリングし、自分たちにできることを見つける。',
        ]}
      />
    </div>
  </div>
);

export default AlphaBusinessGoalPage;
