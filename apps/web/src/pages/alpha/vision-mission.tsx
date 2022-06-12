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

const AlphaVisionAndMissionPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-4 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="ビジョンとミッション">
        <p className="max-w-2xl">
          &emsp;このページは、くらきちを運営するNPO法人くらしのあんぜんきち(仮)のビジョンとミッションを記述しています。
        </p>
      </Temp>
      <TempList
        title="ビジョン・達成したい未来像"
        list={[
          '明日の生活を心配せずに、自分の可能性を追求できる社会',
          '公共福祉に簡単にアクセスできる社会',
          '福祉課題について、皆で協力して取り組める社会',
        ]}
      />
      <TempList
        title="ミッション・果たすべき使命"
        list={[
          '情報取得からサービス利用まで、切れ目ない福祉プラットフォームを製作・運営する',
          '国際基準に則った、安心・信頼できるWebサービスを製作・運営する',
          '公共分野(福祉・医療・教育)に、安価で高機能なWebサービスを提供する',
          '分野横断のコミュニケーションハブを提供する',
        ]}
      />
      <Temp title="付録・製作者の思い">
        <p className="max-w-2xl">
          &emsp;&quot;つながりがほつれた世界&quot;、私は現代社会をそのように捉えています。
          個人主義・自己責任は、一見すると自由で現代的に感じられますが、本当にそうでしょうか。
          人は己のみを頼りに生きていくことができるのでしょうか？
          私はそのように考えていません。人はいつだって、お互いに助け合って生きてきた。そのために社会を作っていたのではないでしょうか。
        </p>
        <br />
        <p className="max-w-2xl">
          &emsp;くらきちは、ほつれた世界をもう一度縫い合わせるための道具として制作されました。
          この世界に生きる人達が、幸福や可能性を存分に追求できる社会をつくるための道具です。
          皆が必要とする&quot;当たり前の暮らし&quot;を、私達自身の手によって、創っていくための道具です。
        </p>
      </Temp>
    </div>
  </div>
);

export default AlphaVisionAndMissionPage;
