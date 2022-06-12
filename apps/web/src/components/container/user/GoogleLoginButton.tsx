import { FC } from 'react';
import { useSsoLoginMutation } from '../../../graphql';
import { GoogleButton } from '../../presentational/atoms';

export const GoogleLoginButton: FC = () => {
  const [ssoLogin] = useSsoLoginMutation();
  const handleClick = async () => {
    try {
      const res = await ssoLogin({
        variables: {
          provider: 'GOOGLE',
        },
      });
      if (res.data?.ssoLogin.__typename === 'SSO') {
        const { url } = res.data.ssoLogin;
        const verified = url.match('https://accounts.google.com/.*');
        if (verified === null) return;
        window.location.replace(verified[0]);
      }
    } catch (err) {
      console.error('err:', err);
    }
  };

  return <GoogleButton onClick={handleClick} />;
};
