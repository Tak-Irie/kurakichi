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
      <div className="mt-4">
        <Temp title="付録・製作者の思い">
          <p className="my-2">
            ※上記のビジョン・ミッションの基になった、作者の考えです。
          </p>
          <p className="max-w-2xl text-justify indent-4">
            &quot;つながりがほつれた世界&quot;、私は現代社会をそのように捉えています。
            現代は、社会のしがらみから開放され、自由に生きる、そんな個人主義・自由主義・自己責任社会になったのです。
            自由と聞くと、とても耳触りの良く、優れているように思えます。ですが、実際の社会はどうでしょうか。
            誰もが生き生きと、生を謳歌している、自由で幸福な世界が広がっているでしょうか。
          </p>
          <br />
          <p className="max-w-2xl text-justify indent-4">
            人は1人では生きていけない、誰かと助け合う必要があるのだ。そんな当たり前をもう一度思い出す必要がある、と私は考えています。
            社会という&quot;基盤&quot;があるからこそ、それぞれの人生を謳歌することができる、そうではありませんか。
            くらきちはその&quot;基盤&quot;を、ほつれた世界を、もう一度縫い合わせるための道具として制作されました。
            皆が必要とする当たり前の暮らしを、私達自身の手によって、創り直していくための道具です。
          </p>
          <br />
          <p className="max-w-2xl text-justify indent-4">
            &quot;当たり前の暮らし&quot;が、当たり前のように皆の手で作られた時、
            その先にこそ、&quot;自由&quot;な地平が広がっているのではないでしょうか。
          </p>
        </Temp>
      </div>
    </div>
  </div>
);

export default AlphaVisionAndMissionPage;
