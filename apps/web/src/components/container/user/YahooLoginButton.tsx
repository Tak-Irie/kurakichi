import { FC } from 'react';
import { YahooButton } from '../../presentational/atoms';

const YahooLoginButton: FC = () => {
  const YAHOO_LOGIN =
    process.env.YAHOO_SSO || 'http://localhost:4000/yahoo/login';
  const handleClick = async () => {
    try {
      const res = await fetch(YAHOO_LOGIN, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      const data = await res.text();
      const verified = data.match('.*');

      if (verified === null) return;

      // console.log('data:', data);

      window.location.assign(verified[0]);
    } catch (err) {
      console.error('err:', err);
    }
  };

  return <YahooButton onClick={handleClick} />;
};

export { YahooLoginButton };
