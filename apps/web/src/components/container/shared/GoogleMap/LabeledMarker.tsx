import {
  MarkerWithLabel,
  MarkerWithLabelOptions,
} from '@googlemaps/markerwithlabel';
import { useRouter } from 'next/router';
import { FC, useCallback, useContext, useEffect } from 'react';
import { MapContext } from './MapContext';

type LabeledMarkerProps = MarkerWithLabelOptions & {
  id?: string;
  linkURL: string;
};

export const LabeledMarker: FC<LabeledMarkerProps> = ({
  linkURL,
  ...options
}) => {
  const { googleMap } = useContext(MapContext);
  const router = useRouter();

  const createMarker = useCallback(() => {
    const marker = new MarkerWithLabel({
      map: googleMap,
      labelClass: linkURL,
      ...options,
    });
    google.maps.event.addListener(marker, 'click', () => {
      // console.log('get:', marker.get());
      router.push(linkURL);
    });
    return marker;
  }, [options, googleMap]);

  const removeMarker = useCallback((marker: google.maps.Marker) => {
    marker.setMap(null);
  }, []);

  useEffect(() => {
    if (!googleMap) {
      return;
    }

    createMarker();
    // eslint-disable-next-line consistent-return
    // return () => removeMarker(marker);
  }, [googleMap, createMarker, removeMarker]);

  return null;
};
