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

const AlphaDevelopmentRoadmapPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-4 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="開発ロードマップ">
        <p className="max-w-2xl">
          &emsp;このページは、くらきちの開発ロードマップを記述しています。
        </p>
      </Temp>
      <TempList
        title="直近開発目標"
        list={[
          '静的コンテンツの充実',
          'ひらがな・英語表示機能の実装',
          '団体へのコメントと返信機能(いわゆる評価システム)',
          'ベース(クライアントの悩みを解決するための、分野横断の情報共有基盤)の実装',
          'スマートフォン向けアプリのリリース',
        ]}
      />
      <TempList title="開発予定" list={['デスクトップ向けアプリのリリース']} />
    </div>
  </div>
);

export default AlphaDevelopmentRoadmapPage;
