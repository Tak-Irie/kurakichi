import { FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { MapContext } from './MapContext';

type Props = {
  position: google.maps.LatLngLiteral;
  content: ReactNode;
};

export const Overlay: FC<Props> = ({ content, position }) => {
  const contextMap = useContext(MapContext);
  const [overlayView, setOverlayView] = useState<google.maps.OverlayView>();
  const container = useMemo<HTMLDivElement>(
    () => document.createElement('div'),
    [],
  );

  useEffect(() => {
    if (!overlayView) {
      setOverlayView(new google.maps.OverlayView());
    }
    return () => {
      if (overlayView) overlayView.setMap(null);
    };
  }, []);

  useEffect(() => {
    const onAdd = () => {
      google.maps.OverlayView.preventMapHitsFrom(container);
      container.classList.add('popup-container');
      const pane = overlayView!.getPanes();
      if (pane) pane.overlayMouseTarget.appendChild(container);
    };

    const draw = () => {
      const projection = overlayView && overlayView.getProjection();
      if (!projection) {
        return;
      }

      const divPosition = projection.fromLatLngToDivPixel(position);
      const display =
        divPosition &&
        Math.abs(divPosition.x) < 4000 &&
        Math.abs(divPosition.y) < 4000
          ? 'block'
          : 'none';

      if (display === 'block') {
        container.style.left = `${divPosition!.x}px`;
        container.style.top = `${divPosition!.y}px`;
      }

      if (container.style.display !== display) {
        container.style.display = display;
      }
    };

    const onRemove = () => {
      if (container) {
        // FIXME: idk proper solution.
        // @ts-ignore
        container = null;
      }
    };

    if (overlayView) {
      overlayView.onAdd = onAdd;
      overlayView.draw = draw;
      overlayView.onRemove = onRemove;
      overlayView.setMap(contextMap);
    }
  }, [overlayView, container, contextMap, position]);

  return createPortal(content, container);
};
