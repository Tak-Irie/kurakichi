import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { LinkNextjs } from '../../components/presentational/atoms';

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
    {title ? <p className="mt-2 underline text-md">{title}</p> : null}
    <ul className="ml-4 text-base list-disc">
      {list!.map((li) => (
        <li key={li}>{li}</li>
      ))}
    </ul>
  </div>
);

const ForExpertPage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-end-12 p-8 my-4 space-y-4 text-gray-800 bg-white rounded-md shadow-md">
        <Temp title="福祉職の皆様へ">
          <p className="max-w-2xl">
            くらきちは、社会福祉に関わる全ての人がつながるポータルサイトも目指しています。
            <br />
            社会福祉充実のために、皆さんの役に立つ道具は何でも作りたいと考えています。
            <br />
            何か不足やご意見があれば、お伝え頂けますと幸いです。
          </p>
        </Temp>
        <TempList
          title="なぜやるか"
          list={[
            'ぬけもれのない社会福祉体制を構築し、困っている人を助ける',
            '福祉サービスの連携を強化し、より効果的な福祉を実現する',
          ]}
        />
        <TempList
          title="どうやるか"
          list={[
            '優れたソフトウェアを提供し、福祉事業者の業務円滑化を図る',
            '福祉に関わる人が、安心して利用できる共有システムを構築する',
            '事業に関係のない、広報・事務処理の機能を一手に担う',
          ]}
        />
        <Temp title="団体登録のお願い">
          <p className="max-w-2xl">以下のページから、ご登録をお願いします。</p>
          <p className="p-1 max-w-2xl bg-red-100 rounded">
            ※注: 現在開発中のため、登録を受け付けておりません。
            ご意見等ございましたら、ぜひ製作者にご連絡下さい。
          </p>
        </Temp>
        <div className="flex space-x-5">
          <div className="p-2 mt-2 bg-yellow-50 hover:bg-slate-100 rounded-md border border-gray-100 shadow">
            <LinkNextjs labelOrElement="団体登録する" url="/org/register" />
          </div>
          <div className="p-2 mt-2 bg-yellow-50 hover:bg-slate-100 rounded-md border border-gray-100 shadow">
            <LinkNextjs
              labelOrElement="ユーザー登録する"
              url="/auth/user-register"
            />
          </div>
          <button
            type="button"
            className="p-2 mt-2 bg-yellow-50 hover:bg-slate-100 rounded-md border border-gray-100 shadow"
            onClick={() => router.push('https://forms.gle/3YiAFmAoL5x187BEA')}
          >
            ご意見・ご要望フォーム
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForExpertPage;
