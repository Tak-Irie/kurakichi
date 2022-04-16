import type { NextPage } from 'next';
import { useState } from 'react';
import { TextH2 } from '../components/presentational/atoms';
import { HelperPop } from '../components/presentational/organisms';
import { useGetOrgsForMapQuery } from '../graphql';
import { DEFAULT_MAP_PIN } from '../util/Constants';

const Index: NextPage = () => {
  const [isLocation, setIsLocation] = useState(DEFAULT_MAP_PIN);
  const { data, loading, error } = useGetOrgsForMapQuery();

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-end-12 p-5 mt-10 bg-white border border-gray-200 shadow-sm">
        <div className="flex justify-items-start">
          <TextH2 content="身近の専門家を探してみましょう！" />
          <span className="flex items-center">
            <HelperPop
              text={
                'くらきちに登録済みの福祉団体が表示されます\n見つからなくても、登録されていないだけかもしれません\nあなたを助けてくれる人は必ず居ます\n\n※Alpha版は製作者によって登録された各都道県庁が表示されます'
              }
            />
          </span>
        </div>
        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-8">
            <div>placer</div>
            {/* {loading && !data?.getOrgs.orgs ? (
              <LoadingSpinner />
            ) : (
              <MapViewer
                center={isLocation}
                mapContainerCSS={{ height: '50vh', width: 'auto' }}
                orgs={data.getOrgs.orgs}
                zoomLevel={13}
              />
            )} */}
          </div>
          <div className="flex flex-col col-span-2 ml-10 space-y-10">
            <div>placer</div>

            {/* <GeocodeByBrowserButton dispatcher={setIsAddress} buttonLabel="位置情報から検索" />
            <GeocodeByPostcodeForm dispatcher={setIsAddress} buttonLabel="郵便番号から検索" />
            <SearchOrgByPrefForm />
            <SearchOrgByServiceForm /> */}
          </div>
        </div>
      </div>
      <div className="col-start-2 col-end-12 p-5 my-10 bg-white border border-gray-200 shadow-sm">
        <div className="flex justify-items-start">
          <TextH2 content="公共サービスは沢山あります！" />
          <span className="flex items-center">
            <HelperPop
              text={
                '日本には活用されていない公共サービスが沢山あります\nどんなものがあるか見てみましょう！\n\n※下記の例は一部です\n※実際に利用する際は気軽に役所やプロに相談してみましょう'
              }
            />
          </span>
        </div>
        <div>placer</div>

        {/* <ArticlesWelfareGuide /> */}
        <div></div>
      </div>
    </div>
  );
};

export default Index;
