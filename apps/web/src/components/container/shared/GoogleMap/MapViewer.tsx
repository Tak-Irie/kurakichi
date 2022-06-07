import { GoogleMap, OverlayView, useLoadScript } from '@react-google-maps/api';
import { CSSProperties, FC } from 'react';
import { Org, useGetOrgsForMapQuery } from '../../../../graphql';
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
};

type Fail = {
  type: 'loading' | 'error';
  data: 'NONE';
};

type Success = {
  type: 'data';
  data: Org[];
};

type UseMapRes = Fail | Success;

const useMap = (): UseMapRes => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || 'NOT_INJECTED',
  });
  const { data, loading, error } = useGetOrgsForMapQuery({
    fetchPolicy: 'cache-first',
  });

  if (!isLoaded || loading) {
    return { type: 'loading', data: 'NONE' };
  }
  if (loadError || error) {
    return { type: 'error', data: 'NONE' };
  }
  if (data?.getOrgs.__typename === 'Errors') {
    return { type: 'error', data: 'NONE' };
  }
  if (data?.getOrgs.__typename === 'Orgs' && data.getOrgs.orgs) {
    return { type: 'data', data: data.getOrgs.orgs };
  }
  return { type: 'error', data: 'NONE' };
};

/**
 * zoomLevelInfo, 10:beyondPref, 11:pref, 12-13:cities 14:city 15:likeAroundStation
 */
export const MapViewer: FC<MapViewerProps> = ({
  center,
  mapContainerCSS,
  zoomLevel,
}) => {
  const res = useMap();

  console.log('render-viewer:');

  if (res.type === 'error') {
    return <p>Mapの読み込みに失敗しました</p>;
  }

  if (res.type === 'loading') {
    return (
      <div style={mapContainerCSS}>
        <span className="flex">
          <LoadingSpinner />
          <p>地図を読み込んでいます</p>
        </span>
      </div>
    );
  }

  const success = res.data as Org[];
  return (
    <GoogleMap
      mapContainerStyle={mapContainerCSS}
      center={center}
      zoom={zoomLevel}
    >
      {success.map((org) => (
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
  );
};
