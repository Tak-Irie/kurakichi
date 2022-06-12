import { FC, useContext, useEffect, useState } from 'react';
import { MapContext } from './MapContext';

export const Marker: FC<google.maps.MarkerOptions> = ({ position }) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const contextMap = useContext(MapContext);

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker, contextMap, position]);

  useEffect(() => {
    if (marker) {
      marker.setOptions({ map: contextMap, position });
      contextMap?.setCenter(position as google.maps.LatLngAltitudeLiteral);
      contextMap?.setZoom(15);
    }
  }, [marker, position, contextMap]);

  return null;
};
