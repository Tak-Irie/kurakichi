import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const howToPage: NextPage = () => {
  const [isLocation, setIsLocation] = useState<GeolocationCoordinates>();

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => setIsLocation(position.coords),
      (err) => console.log('err:', err.message),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    console.log('isLoc:', isLocation);
  }, [isLocation]);

  return (
    <div className="inset-0">
      <p>placer</p>
      <p>lat: {isLocation ? isLocation.latitude : null}</p>
      <p>long: {isLocation ? isLocation.longitude : null}</p>
      <button type="button" onClick={handleClick}>
        getLocation
      </button>
    </div>
  );
};

export default howToPage;
