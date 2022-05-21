import { createCustomEqual } from 'fast-equals';
import {
  Children,
  cloneElement,
  EffectCallback,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

interface MapProps extends google.maps.MapOptions {
  className: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: ReactNode;
}

export const Map: FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  className,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div ref={ref} className={className} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }
    return deepEqual(a, b);
  },
);

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: EffectCallback,
  dependencies: any[],
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

function isLatLngLiteral(obj: any): obj is google.maps.LatLngLiteral {
  return (
    obj != null &&
    typeof obj === 'object' &&
    Number.isFinite(obj.lat) &&
    Number.isFinite(obj.lng)
  );
}
