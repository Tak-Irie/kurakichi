// import {
//   memo,
//   ReactNode,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
// } from 'react';
// import { createPortal } from 'react-dom';
// // import { GoogleMapsContext } from '../../context/GoogleMapsContext';

// type Props = {
//   position: google.maps.LatLng;
//   size: number;
//   enableRealtimeUpdate?: boolean;
//   children: ReactNode;
// };

// export const OverlayView = memo((props: Props) => {
//   const { googleMap } = useContext(GoogleMapsContext);
//   const { position, size, enableRealtimeUpdate, children } = props;

//   let container = useMemo<HTMLDivElement>(
//     () => document.createElement('div'),
//     [],
//   );

//   const overlayView = useMemo<google.maps.OverlayView>(
//     () => new google.maps.OverlayView(),
//     [],
//   );

//   const unmount = useCallback(() => {
//     overlayView.setMap(null);
//   }, [overlayView]);

//   const onAdd = useCallback(() => {
//     google.maps.OverlayView.preventMapHitsFrom(container);
//     container.style.position = 'absolute';
//     overlayView.getPanes().overlayMouseTarget.appendChild(container);
//   }, [container, overlayView]);

//   const draw = useCallback(() => {
//     const projection = overlayView.getProjection();
//     if (!projection) {
//       return;
//     }

//     const point = projection.fromLatLngToDivPixel(position);
//     // 要素の大きさに合わせて、正しい緯度経度に描画されるように調整します
//     container.style.left = `${point.x - size}px`;
//     container.style.top = `${point.y - size}px`;
//   }, [overlayView, container, position, size]);

//   const onRemove = useCallback(() => {
//     if (container) {
//       (container.parentNode as HTMLElement).removeChild(container);
//       container = null; // メモリ解放
//     }
//   }, [container]);

//   const initOverlay = useCallback(() => {
//     overlayView.onAdd = onAdd.bind(this);
//     overlayView.draw = draw.bind(this);
//     overlayView.onRemove = onRemove.bind(this);

//     overlayView.setMap(googleMap);
//   }, [overlayView, googleMap, onAdd, draw, onRemove]);

//   useEffect(() => {
//     if (position && enableRealtimeUpdate) {
//       draw();
//       overlayView.draw = draw.bind(this);
//     }
//   }, [position]);

//   useEffect(() => {
//     initOverlay();

//     return () => unmount();
//   }, []);

//   return createPortal(children, container);
// });
