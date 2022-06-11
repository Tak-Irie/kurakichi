import {
  MarkerWithLabel,
  MarkerWithLabelOptions,
} from '@googlemaps/markerwithlabel';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
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
  const [marker, setMarker] = useState<google.maps.Marker>();
  const router = useRouter();

  useEffect(() => {
    if (!marker) {
      setMarker(
        new MarkerWithLabel({
          map: googleMap,
          labelClass: linkURL,
          ...options,
        }),
      );
      if (marker) {
        google.maps.event.addListener(marker, 'click', () => {
          router.push(linkURL);
        });
      }
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker, googleMap, linkURL, options, router]);

  return null;
};
