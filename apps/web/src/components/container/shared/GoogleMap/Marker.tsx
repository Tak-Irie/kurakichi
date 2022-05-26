import { FC, useEffect, useState } from 'react';

export const Marker: FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const contentString = '<div><p>hoge</p></div>';

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
  }, [marker]);

  useEffect(() => {
    const { map } = options;
    if (marker) {
      marker.setOptions(options);
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      });
      marker.addListener('click', () => {
        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    }
  }, [marker, options]);

  return null;
};
