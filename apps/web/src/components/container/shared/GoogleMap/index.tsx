/* eslint-disable react/jsx-no-constructed-context-values */
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { MapContext } from './MapContext';

type MapProps = {
  children?: ReactNode;
};

const tokyoMetropolitanGovernment = {
  lat: 35.6896342,
  lng: 139.6921007,
};

export const Map: FC<MapProps> = ({ children }) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();

  const initGoogleMaps = useCallback(() => {
    const map = new google.maps.Map(
      document.querySelector('#map') as HTMLElement,
      { center: tokyoMetropolitanGovernment, zoom: 12 },
    );
    setGoogleMap(map);
  }, []);

  useEffect(() => {
    initGoogleMaps();
  }, []);

  return (
    <div id="map" className="w-full h-full">
      <MapContext.Provider value={{ googleMap: googleMap as google.maps.Map }}>
        {children}
      </MapContext.Provider>
    </div>
  );
};
