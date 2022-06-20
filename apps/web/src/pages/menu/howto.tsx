import { NextPage } from 'next';
import Image from 'next/image';
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
  list: string[];
};
const TempList: FC<TempListProps> = ({ list }) => (
  <ul className="ml-4 text-base list-disc">
    {list!.map((li) => (
      <li key={li}>{li}</li>
    ))}
  </ul>
);

const HowToPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-4 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="くらきちのつかいかた">
        <p className="max-w-2xl">くらきちは主に3つの機能があります</p>
      </Temp>
      <Temp title="1.支援団体・事業者を探す">
        <p className="max-w-2xl indent-4">
          あなたがお住まいの地域の事業者を探すことができます。
        </p>
        <div className="flex mt-3 h-96">
          <div className="basis-1/3">
            <TempList
              list={[
                '吹き出しをクリックしてみましょう！',
                '様々な条件を指定して絞り込んでみましょう',
              ]}
            />
            <br />
            <p className="bg-red-100">
              ※製作中:利用者の利用シーンに適合した利用例を2~3提示する。
            </p>
          </div>
          <div className="relative basis-2/3 h-full">
            <Image
              src="/howto-map.webp"
              layout="fill"
              objectFit="contain"
              alt="map"
            />
          </div>
        </div>
      </Temp>
      <Temp title="2.どのような福祉制度があるか調べる">
        <p className="max-w-2xl indent-4">
          くらきちには、福祉制度のよくある利用例を掲載してあります。
        </p>
        <div className="flex mt-3 h-96">
          <div className="basis-1/3">
            <TempList list={['あなたが必要とする分野を探してみましょう！']} />
            <br />
            <p className="bg-red-100">
              ※製作中:需要に基づいて記事を記載する。
              <br />
              SEOを意識しており、検索からの流入を主目的とする。
            </p>
            <p className="mt-2 bg-red-100">
              ※注記:これらの記事は、あくまで参考程度・SEO対策である。
              くらきちの主たる使い方は、困窮者を専門家へと繋げることである。
            </p>
          </div>
          <div className="relative basis-2/3 h-full">
            <Image
              src="/howto-article.webp"
              layout="fill"
              objectFit="contain"
              alt="article"
            />
          </div>
        </div>
      </Temp>
      <Temp title="3.支援団体・事業者に連絡を取る">
        <p className="max-w-2xl indent-4">
          気になる団体に連絡を取ってみましょう！
        </p>
        <div className="flex mt-3 h-96">
          <div className="basis-1/3">
            <TempList list={['かんたんにメッセージを送ることが出来ます！']} />
            <br />
            <p className="bg-red-100">
              ※製作中:メールを利用せずにメッセージを送信する。
              <br />
              くらきち内で、事業利用の全てを完結できるようにすることが目標である。
            </p>
          </div>
          <div className="relative basis-2/3 h-full">
            <Image
              src="/howto-inquiry.webp"
              layout="fill"
              objectFit="contain"
              alt="map"
            />
          </div>
        </div>
      </Temp>
    </div>
  </div>
);

export default HowToPage;
