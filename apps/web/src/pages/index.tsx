import { NextPage } from 'next';
import { ReactNode, useState } from 'react';
import {
  SearchOrgByPrefForm,
  SearchOrgByServiceForm,
} from '../components/container/org';
import {
  GeocodeByBrowserButton,
  GeocodeByPostcodeForm,
} from '../components/container/shared';
import { Map } from '../components/container/shared/GoogleMap/index';
import { LabeledMarker } from '../components/container/shared/GoogleMap/LabeledMarker';
import { TextH2 } from '../components/presentational/atoms';
import {
  ArticlesWelfareGuide,
  HelperPop,
} from '../components/presentational/organisms';
import { useGetOrgsForMapQuery } from '../graphql';
import { DEFAULT_MAP_PIN } from '../lib/Constants';

const Index: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLocation, setIsLocation] = useState(DEFAULT_MAP_PIN);
  const { data, loading, error } = useGetOrgsForMapQuery({
    fetchPolicy: 'cache-first',
  });
  // console.log('org-data:', data?.getOrgs);
  let mapContent: ReactNode = null;
  if (error) mapContent = <div>組織情報の取得意失敗しました</div>;
  if (loading) mapContent = <div>地図を読み込んでいます</div>;
  if (data?.getOrgs.__typename === 'Orgs') {
    mapContent = (
      <div>
        {data.getOrgs.orgs?.map((org) => (
          <LabeledMarker
            key={org.id}
            labelContent="<div>hoge</div>"
            labelClass={`map-org map-${org.id}`}
            position={{
              lat: org.address?.latitude || 0,
              lng: org.address?.longitude || 0,
            }}
            linkURL={`/org/${org.id}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-end-12 p-5 mt-10 bg-white border border-gray-200 shadow-sm">
        <div className="flex justify-items-start">
          <TextH2 content="身近の支援者を探してみましょう！" />
          <div className="flex items-center">
            <HelperPop
              text={
                'くらきちに登録済みの福祉団体が表示されます\n見つからなくても、登録されていないだけかもしれません\nあなたを助けてくれる人は必ず居ます\n\n※Alpha版は製作者によって登録された各都道県庁が表示されます'
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-10 mt-5 h-full">
          <div className="col-span-8">
            <div className="w-auto h-[500px]">
              <Map>{mapContent}</Map>
            </div>
          </div>
          <div className="flex flex-col col-span-2 ml-10 space-y-10">
            <GeocodeByBrowserButton
              dispatcher={setIsLocation}
              buttonLabel="位置情報から検索"
            />
            <GeocodeByPostcodeForm
              dispatcher={setIsLocation}
              buttonLabel="郵便番号から検索"
            />
            <SearchOrgByPrefForm />
            <SearchOrgByServiceForm />
          </div>
        </div>
      </div>
      <div className="col-start-2 col-end-12 p-5 my-10 bg-white border border-gray-200 shadow-sm">
        <div className="flex justify-items-start">
          <TextH2 content="公共サービスは沢山あります！" />
          <div className="flex items-center">
            <HelperPop
              text={
                '日本には活用されていない公共サービスが沢山あります\nどんなものがあるか見てみましょう！\n\n※下記の例は一部です\n※実際に利用する際は気軽に役所やプロに相談してみましょう'
              }
            />
          </div>
        </div>
        <ArticlesWelfareGuide />
      </div>
    </div>
  );
};

export default Index;
