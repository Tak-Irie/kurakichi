import { NextPage } from 'next';
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
type TempListProps = {
  title?: string;
  list: string[];
};
const TempList: FC<TempListProps> = ({ list, title }) => (
  <div className="mt-4">
    {title ? <p className="mt-2 text-lg font-bold underline">{title}</p> : null}
    <ul className="ml-4 text-base list-disc">
      {list!.map((li) => (
        <li key={li}>{li}</li>
      ))}
    </ul>
  </div>
);

const AboutUsPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-4 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="くらきちについて">
        <p className="max-w-2xl">
          急に仕事がなくなった？育児について不安がある？介護が必要になった？
          <br />
          専門家や支援者に相談してみましょう！
          <br />
          <br />
          くらきちは、あなたの不安や困りごとの解決をお手伝いします。
        </p>
        <TempList
          list={[
            'どのような公共サービスを受けられるかお知らせします',
            'どのような支援者さんがいるか、お伝えします',
            '支援者さんがどのようなことをされているか、ご紹介します',
            '支援者さんと簡単に連絡できるようにします',
          ]}
        />
      </Temp>
      <Temp title="くらきちのめざすもの">
        <p className="max-w-2xl indent-4">
          私達の社会には、公共福祉というものがあります。税金を使って、困っている方を助けるための制度です。
          これらの制度は、困っている方ならば誰でも使えるものです。しかし現在のところ、こういった制度が有効に活用されていない場合もございます。
          くらきちはそういった不幸を解消し、全ての方が公共福祉を十分に活用できる社会を目指しています。
        </p>
      </Temp>
      <Temp title="なまえの由来">
        <p className="max-w-2xl indent-4">
          &quot;あんぜんきち&quot;は発達心理学のことばです。養育者とこどもの間に築かれる、愛情による信頼関係を意味しています。
          こどもは、&quot;あんぜんきち&quot;があるからこそ、挑戦し、失敗し、成功し、成長することが出来ると言われています。
          支えてくれる、肯定してくれる、帰ることのできる、そういった安心できる場所があるから、冒険できるのです。
        </p>
        <br />
        <p className="max-w-2xl indent-4">
          くらきちは、社会に生きる人々の&quot;あんぜんきち&quot;になりたいのです。
        </p>
      </Temp>
    </div>
  </div>
);

export default AboutUsPage;
