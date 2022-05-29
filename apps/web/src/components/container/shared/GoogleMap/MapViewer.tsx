import {
  GoogleMap,
  Marker,
  OverlayView,
  useLoadScript,
} from '@react-google-maps/api';
import { CSSProperties, FC } from 'react';
import { Org } from '../../../../graphql';
import {
  ButtonBig,
  LinkNextjs,
  LoadingSpinner,
  TextSmall,
} from '../../../presentational/atoms';

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
export const MapViewer: FC<MapViewerProps> = ({
  center,
  mapContainerCSS,
  orgs,
  zoomLevel,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || 'NOT_INJECTED',
  });
  if (loadError) return <p>Mapの読み込みに失敗しました</p>;

  console.log('mapComponentMounted:');
  console.log('orgs:', orgs);

  if (orgs) {
    return isLoaded ? (
      <GoogleMap
        mapContainerStyle={mapContainerCSS}
        center={center}
        zoom={zoomLevel}
      >
        {orgs.map((org) => (
          <div key={org.id}>
            <OverlayView
              position={{
                lat: org.address?.latitude || 0,
                lng: org.address?.longitude || 0,
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="p-1 bg-white rounded border border-gray-200">
                <LinkNextjs
                  url="/org/[id]"
                  as={`/org/${org.id}`}
                  labelOrElement={
                    <ButtonBig
                      type="button"
                      label={org.name || ''}
                      color="yellow"
                    />
                  }
                />
                <TextSmall content={org.description || ''} />
              </div>
            </OverlayView>
          </div>
        ))}
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
    <GoogleMap
      mapContainerStyle={mapContainerCSS}
      center={center}
      zoom={zoomLevel}
    >
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
