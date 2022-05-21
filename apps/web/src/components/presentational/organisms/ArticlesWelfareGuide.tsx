import { FC } from 'react';
import { Article } from '../molecules';

// type ArticlesWelfareGuideProps = {};

export const ArticlesWelfareGuide: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-8 mt-10 max-w-full md:grid-cols-2 xl:grid-cols-3">
      <Article
        imageSrc="/save_money_pig.jpg"
        title="暮らし"
        description={
          '・生活費が足りない\n・住む場所がない\n・働くことが出来ない\n・出産・入学・入退院などで生活が苦しい\n・結婚資金が足りない\n・生活福祉資金貸付制度を利用する'
        }
        linkUrl="/guide/life"
      />
      <Article
        imageSrc="/worker.webp"
        title="仕事"
        description={
          '・就職のための訓練を受けたい\n・仕事のスキルアップをしたい\n・日雇い雇用の仕事がない\n・仕事で怪我・病気になった\n・仕事で家族が亡くなった\n・失業・怪我・育児による休業をした'
        }
        linkUrl="/guide/work"
      />
      <Article
        imageSrc="/patient.jpg"
        title="医療・障害"
        description={
          '・健康保険料が支払えない・医療費が高すぎる\n・重い病気になった\n・障碍になった(視聴覚・言語・四肢・臓器・免疫)\n・家族が知的障害だ\n・医療に関わる税金の控除を受けたい\n・発達障害・高次脳機能障害かもしれない'
        }
        linkUrl="/guide/medical"
      />
      <Article
        imageSrc="/pregnant.jpg"
        title="妊娠・出産"
        description={
          '・妊婦健診の費用補助\n・出産費用の支援\n・不妊治療費助成制度\n・産休に係る社会保険免除\n・出産費貸付制度'
        }
        linkUrl="/guide/child"
      />
      <Article
        imageSrc="/father_and_girl.jpg"
        title="育児"
        description={
          '・育児休業給付金を受ける\n・ひとり親職業訓練給付金\n・毎月の児童手当'
        }
        linkUrl="/guide/child"
      />
      <Article
        imageSrc="/nursing-elder.jpg"
        title="介護"
        description={
          '・介護保険が支払えない\n・介護サービス費が高すぎる\n・介護によって休業した\n・介護の支援を受けたい'
        }
        linkUrl="/guide/medical"
      />
      <Article
        imageSrc="/pension.jpg"
        title="年金"
        description={
          '・国民年金を支払えない\n・遺族年金を受け取る\n・年金だけで暮らしていけない\n・亡くなった家族の年金を受け取る'
        }
        linkUrl="/guide/pension"
      />
      <Article
        imageSrc="/house.jpg"
        title="住居"
        description={
          '・住宅ローン減税を利用する\n・省エネ改修のための補助金・減税を利用する\n・バリアフリーのための減税制度を利用する'
        }
        linkUrl="/guide/house"
      />
      <Article
        imageSrc="/lawyer.jpg"
        title="法律"
        description={'・弁護士を雇いたい・相談したいがお金がない'}
        linkUrl="/guide/law"
      />
    </div>
  );
};
