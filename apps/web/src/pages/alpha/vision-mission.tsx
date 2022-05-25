import { NextPage } from 'next';

const AlphaVisionAndMissionPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-2 text-gray-800 bg-white rounded-md shadow-md">
      <div>
        <p className="text-lg font-bold underline">
          くらしのあんぜんきちが掲げるビジョンとミッション
        </p>
      </div>
      <div>
        <p className="text-base font-semibold  underline">ビジョン・未来像</p>
        <p>・人類が、明日の生活を心配せずに、自身の可能性を追求できる世界</p>
        <p>・誰しもが、必要な公共福祉に簡単にアクセスできる社会</p>
        <p>
          ・様々な福祉課題について、関係する人達が十分に協力して取り組める社会
        </p>
      </div>
      <div>
        <p className="text-base font-semibold underline">ミッション・使命</p>
        <p>
          ・情報の取得からサービスの利用まで、一気通貫の福祉プラットフォームを製作・運営する
        </p>
        <p>
          ・国際基準に則った、安心して利用できる分野横断のコミュニケーションハブを製作・運営する
        </p>
        <p>
          ・福祉、医療、教育などの公共性の高い分野に、先端テクノロジーによる高機能ソフトウェアを提供する
        </p>
      </div>
    </div>
  </div>
);

export default AlphaVisionAndMissionPage;
