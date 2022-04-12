import { CSSProperties, VFC } from 'react';
import { useRouter } from 'next/router';
import { GoogleMap, useLoadScript, Marker, OverlayView } from '@react-google-maps/api';

import { LoadingSpinner, ButtonBig, TextSmall } from '../presentational';
import { LinkNextjs } from '.';
import { Org } from '../../graphql';

type Geocode = {
  lat: number;
  lng: number;
};

type MapViewerProps = {
  mapContainerCSS: CSSProperties;
  zoomLevel: number;
  center: Geocode;
  orgs?: Org[];
};

/**
 * zoomLevelInfo, 10:beyondPref, 11:pref, 12-13:cities 14:city 15:likeAroundStation
 */
export const MapViewer: VFC<MapViewerProps> = ({ center, mapContainerCSS, orgs, zoomLevel }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });
  console.log('mapComponentMounted:');

  if (loadError) return <p>Mapの読み込みに失敗しました</p>;
  console.log('orgs:', orgs);

  if (orgs) {
    return isLoaded ? (
      <GoogleMap mapContainerStyle={mapContainerCSS} center={center} zoom={zoomLevel}>
        {orgs.map((org) => {
          return (
            <span key={org.id}>
              <OverlayView
                position={{ lat: org.latitude, lng: org.longitude }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="bg-white border border-gray-200 p-1 rounded">
                  <LinkNextjs
                    url="/org/[id]"
                    as={`/org/${org.id}`}
                    labelOrElement={<ButtonBig type="button" label={org.orgName} color="yellow" />}
                  />
                  <TextSmall content={org.description} />
                </div>
              </OverlayView>
              <Marker position={center} />;
            </span>
          );
        })}
      </GoogleMap>
    ) : (
      <div style={mapContainerCSS}>
        <span className="flex">
          <LoadingSpinner />
          <p>地図を読み込んでいます</p>
        </span>
      </div>
    );
  }
  console.log('no org:');

  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapContainerCSS} center={center} zoom={zoomLevel}>
      <Marker position={center} />;
    </GoogleMap>
  ) : (
    <div style={mapContainerCSS}>
      <span className="flex">
        <LoadingSpinner />
        <p>地図を読み込んでいます</p>
      </span>
    </div>
  );
};
