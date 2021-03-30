import { NextPage } from 'next';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '80vw',
  height: '80vh',
};
const center = {
  lat: 35.6809,
  lng: 139.7673,
};

const Map: NextPage = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  if (loadError) return <p>Mapの読み込みに失敗しました</p>;

  return isLoaded ? (
    <>
      <p>this is ex1</p>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
        <Marker position={center} />
      </GoogleMap>
    </>
  ) : (
    <p>読込中です</p>
  );
};

export default Map;
