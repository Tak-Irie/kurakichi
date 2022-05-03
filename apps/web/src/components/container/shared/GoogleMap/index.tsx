import { Status, Wrapper } from '@googlemaps/react-wrapper';
import type { FC } from 'react';
import { Map } from './Map';
import { Marker } from './Marker';

const tokyoPublicOffice = {
  lat: 35.6896342,
  lng: 139.6921007,
};

const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY || 'NOT_INJECTED';

// zoomLevelInfo, 10:beyondPref, 11:pref, 12-13:cities 14:city 15:likeAroundStation
export const GoogleMap: FC = () => {
  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <h1>ろーどちゅう</h1>;
      case Status.FAILURE:
        return <h1>えらー</h1>;
      case Status.SUCCESS:
        return <h1>{status}</h1>;
    }
  };

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <Map className="flex w-full h-96" center={tokyoPublicOffice} zoom={12}>
        <Marker position={tokyoPublicOffice} />
      </Map>
    </Wrapper>
  );
};
