import { NextPage } from 'next';
import { GeneralTemplate, TextLabel, TextSmall, ButtonBig } from '../../components/presentational';
import { LinkNextjs } from '../../components/container';

const HouseGuidePublicPage: NextPage = () => {
  return (
    <GeneralTemplate
      title="住居に係る公共福祉サービス"
      content={
        <div className="h-screen">
          <TextLabel content="Alpha版：作成中" />
          <TextSmall content="※ くらきち製作者は福祉の専門家では有りません" />
          <TextSmall content="※ 福祉の専門家監修の下、ユースケースに応じたわかりやすい支援事例等を掲載する予定です" />
          <TextSmall content="※ こちらのページはあくまで事例紹介・基礎知識に留まるものであり、くらきちの本旨はクライアントを専門家へ繋げることです" />
          <div className="flex justify-end w-auto">
            <LinkNextjs
              labelOrElement={<ButtonBig type="button" color="yellow" label="トップに戻る" />}
              url="/"
            />
          </div>
        </div>
      }
    />
  );
};

export default HouseGuidePublicPage;
