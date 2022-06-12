import { NextPage } from 'next';

const AlphaVisionAndMissionPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-2 text-gray-800 bg-white rounded-md shadow-md">
      <div>
        <p className="text-lg font-bold underline">ビジョンとミッション</p>
        <p className="text-base">
          このページは、くらきちを運営する、NPO法人くらしのあんぜんきち(仮)のビジョンとミッションを記述しています。
        </p>
      </div>
      <div>
        <p className="text-base font-semibold  underline">
          ビジョン・達成したい未来像
        </p>
        <p>明日の生活を心配せずに、自分の可能性を追求できる</p>
        <p>公共福祉に簡単にアクセスできる</p>
        <p>福祉課題について、皆で協力して取り組める</p>
      </div>
      <div>
        <p className="text-base font-semibold underline">
          ミッション・果たすべき使命
        </p>
        <p>
          情報取得からサービス利用まで、切れ目ない福祉プラットフォームを製作・運営する
        </p>
        <p>最新国際基準に則った、安心・信頼できるWebサービスを製作・運営する</p>
        <p>公共分野に、安価で高機能なWebサービスを提供する</p>
        <p>福祉の名の下、分野横断のコミュニケーションハブを提供する</p>
      </div>
      <div>
        <p className="text-base font-semibold underline">付録・製作者の思い</p>
        <p>
          &nbsp;私達の社会は、お互いの助け合いによって成立していました。
          <br />
          しかし、現代社会はその仕組が壊れているように、私には感じられます。
          <br />
          そういった状況を少しでも良くしたい、そんな思いのもとにくらきちは運営されています。
        </p>
      </div>
    </div>
  </div>
);

export default AlphaVisionAndMissionPage;
