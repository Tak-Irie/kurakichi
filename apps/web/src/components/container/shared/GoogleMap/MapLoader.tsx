import { Loader } from '@googlemaps/js-api-loader';
import { FC, ReactNode, useEffect, useState } from 'react';

type MapLoaderProps = {
  children: ReactNode;
};

export const MapLoader: FC<MapLoaderProps> = ({ children }) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
    region: 'jp',
    version: 'weekly',
  });

  useEffect(() => {
    loader
      .load()
      .then(() => setMapLoaded(true))
      .catch(() => setMapLoaded(false));
  });

  if (!mapLoaded) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};
