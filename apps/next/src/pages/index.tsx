import { useState } from 'react';
import { NextPage } from 'next';

import { MapViewer, GeocodeByBrowserButton, GeocodeByPostcodeForm } from '@next/container';
import { ArticlesWelfareGuide } from '@next/ui';

const tokyoOffice = {
  lat: 35.6896342,
  lng: 139.6921007,
};

const IndexPage: NextPage = () => {
  const [isLocation, setIsLocation] = useState(tokyoOffice);

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-end-12 mt-10">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <MapViewer
              center={isLocation}
              markers={[isLocation]}
              mapContainerCSS={{ height: '50vh', width: 'auto' }}
              zoomLevel={14}
            />
          </div>
          <div className="col-span-2 ml-10 space-y-10 flex flex-col">
            <GeocodeByBrowserButton dispatcher={setIsLocation} buttonLabel="位置情報から検索する" />
            <GeocodeByPostcodeForm dispatcher={setIsLocation} buttonLabel="郵便番号から検索する" />
          </div>
        </div>
      </div>
      <div className="col-start-2 col-end-12">
        <ArticlesWelfareGuide />
      </div>
    </div>
  );
};

export default IndexPage;
