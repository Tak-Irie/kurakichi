import { Status, Wrapper } from '@googlemaps/react-wrapper';
import type { FC, ReactNode } from 'react';
import { Map } from './Map';

type Geo = {
  lat: number;
  lng: number;
};

const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY || 'NOT_INJECTED';

type GoogleMapProps = {
  children?: ReactNode;
  center: Geo;
  zoomLevel: number;
};

// zoomLevelInfo, 10:beyondPref, 11:pref, 12-13:cities 14:city 15:likeAroundStation
export const GoogleMap: FC<GoogleMapProps> = ({
  children,
  center,
  zoomLevel,
}) => {
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <h1>Loading</h1>;
      case Status.FAILURE:
        return <h1>Error</h1>;
      case Status.SUCCESS:
        return <h1>{status}</h1>;
      default:
        return <h1>Error</h1>;
    }
  };

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <Map className="flex w-full h-96" center={center} zoom={zoomLevel || 12}>
        {children}
      </Map>
    </Wrapper>
  );
};
