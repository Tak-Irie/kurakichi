import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { ButtonWithIcon, IconsWifi } from '../../presentational';

type GeocodeByBrowserButtonProps = {
  buttonLabel: string;
  dispatcher: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
};

export const GeocodeByBrowserButton: FC<GeocodeByBrowserButtonProps> = ({
  buttonLabel,
  dispatcher,
}) => {
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
    if (isLocation) {
      dispatcher({ lat: isLocation.latitude, lng: isLocation.longitude });
    }
  }, [isLocation, dispatcher]);

  return (
    <div>
      <ButtonWithIcon
        label={buttonLabel}
        type="button"
        icon={<IconsWifi />}
        onClick={handleClick}
      />
    </div>
  );
};
