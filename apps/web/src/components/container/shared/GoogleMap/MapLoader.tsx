import { Loader } from '@googlemaps/js-api-loader';
import { FC, ReactNode, useEffect, useState } from 'react';
import { LoadingSpinner } from '../../../presentational';

type MapLoaderProps = {
  children: ReactNode;
};

const MapLoader: FC<MapLoaderProps> = ({ children }) => {
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
    return <LoadingSpinner />;
  }

  return <div>{children}</div>;
};

export default MapLoader;
