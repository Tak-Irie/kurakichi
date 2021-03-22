import { FC } from 'react';
import { YahooButton } from '../presentational/atoms/YahooButton';

const YahooLoginButton: FC = () => {
  const handleClick = async () => {
    try {
      const res = await fetch('https://localhost/yahoo/login', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      const data = await res.text();
      const verified = data.match('.*');

      if (verified === null) return;

      console.log('data:', data);
      console.log('verified:', verified);

      window.location.assign(verified[0]);
    } catch (err) {
      console.log('err:', err);
    }
  };

  return <YahooButton onClick={handleClick} />;
};

export { YahooLoginButton };
