import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { FC } from 'react';

import { Map } from './Map';

const tokyoPublicOffice = {
  lat: 35.6896342,
  lng: 139.6921007,
};

const apiKey = process.env.MAP_API_KEY || 'hoge';

// zoomLevelInfo, 10:beyondPref, 11:pref, 12-13:cities 14:city 15:likeAroundStation

export const GoogleMap: FC = () => {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <Map className="flex w-full h-96" center={tokyoPublicOffice} zoom={12} />
    </Wrapper>
  );
};
