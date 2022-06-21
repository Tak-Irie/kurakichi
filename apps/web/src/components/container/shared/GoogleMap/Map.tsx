import { FC, ReactNode, useEffect, useState } from 'react';
import { MapContext } from './MapContext';

type MapProps = {
  center?: google.maps.LatLngLiteral;
  children?: ReactNode;
};

const tokyoMetropolitanGovernment = {
  lat: 35.6896342,
  lng: 139.6921007,
};

export const Map: FC<MapProps> = ({
  children,
  center = tokyoMetropolitanGovernment,
}) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();

  useEffect(() => {
    const map = new google.maps.Map(
      document.querySelector('#map') as HTMLElement,
      { center: tokyoMetropolitanGovernment, zoom: 12 },
    );
    setGoogleMap(map);
  }, []);

  useEffect(() => {
    googleMap?.setCenter(center);
  }, [googleMap, center]);

  return (
    <div id="map" className="w-full h-full">
      <MapContext.Provider value={googleMap as google.maps.Map}>
        {children}
      </MapContext.Provider>
    </div>
  );
};
