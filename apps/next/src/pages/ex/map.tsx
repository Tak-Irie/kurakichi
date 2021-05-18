import { NextPage } from 'next';

import { MapViewer } from '@next/container';

const containerStyle = {
  width: '80vw',
  height: '80vh',
};
const center = {
  lat: 35.6809,
  lng: 139.7673,
};

const mark2 = {
  lat: 35.6909,
  lng: 139.7773,
};
const mark3 = {
  lat: 35.6709,
  lng: 139.7573,
};

const Map: NextPage = () => {
  return (
    <div>
      <p>sample of MapViewerComponent</p>
      <MapViewer
        center={center}
        mapContainerCSS={containerStyle}
        zoomLevel={11}
        markers={[center, mark2, mark3]}
      />
    </div>
  );
};

export default Map;
