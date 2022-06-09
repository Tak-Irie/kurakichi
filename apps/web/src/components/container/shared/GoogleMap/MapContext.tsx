import { createContext } from 'react';

type MapContextProps = {
  googleMap: google.maps.Map | null;
};

export const MapContext = createContext<MapContextProps>({
  googleMap: null,
});
