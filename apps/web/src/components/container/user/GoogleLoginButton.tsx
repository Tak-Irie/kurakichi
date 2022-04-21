import { FC } from 'react';
import { GoogleButton } from '../../presentational/atoms';

const GoogleLoginButton: FC = () => {
  const GOOGLE_LOGIN =
    process.env.GOOGLE_SSO || 'http://localhost:4000/google/login';
  const handleClick = async () => {
    try {
      const res = await fetch(GOOGLE_LOGIN, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      const data = await res.text();
      const verified = data.match(
        'https://accounts.google.com/o/oauth2/v2/auth.*',
      );

      if (verified === null) return;

      // console.log('data:', data);
      // console.log('verified:', verified);

      window.location.assign(verified[0]);
    } catch (err) {
      console.error('err:', err);
    }
  };

  return <GoogleButton onClick={handleClick} />;
};

export { GoogleLoginButton };
