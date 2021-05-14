import { CSSProperties, VFC } from 'react';
import { GoogleMap, useLoadScript, Marker, OverlayView, InfoBox } from '@react-google-maps/api';

import { LoadingSpinner } from '@next/ui';

type Geocode = {
  lat: number;
  lng: number;
};

type MapViewerProps = {
  mapContainerCSS: CSSProperties;
  zoomLevel: number;
  center: Geocode;
  markers: Geocode[];
};

/**
 * zoomLevelInfo, 10:beyondPref, 11:pref, 12-13:cities 14:city 15:likeAroundStation
 */
export const MapViewer: VFC<MapViewerProps> = ({ center, mapContainerCSS, markers, zoomLevel }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  if (loadError) return <p>Mapの読み込みに失敗しました</p>;

  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapContainerCSS} center={center} zoom={zoomLevel}>
      {markers.map((marker) => {
        return (
          <span key={marker.lat}>
            <Marker position={marker} />;
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
};
