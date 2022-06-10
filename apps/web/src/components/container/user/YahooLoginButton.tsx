import type { FC } from 'react';
import { useSsoLoginMutation } from '../../../graphql';
import { YahooButton } from '../../presentational/atoms';

const YahooLoginButton: FC = () => {
  const [ssoLogin] = useSsoLoginMutation();
  const handleClick = async () => {
    try {
      const res = await ssoLogin({
        variables: {
          provider: 'YAHOO',
        },
      });
      if (res.data?.ssoLogin.__typename === 'SSO') {
        const { url } = res.data.ssoLogin;
        const verified = url.match('https://auth.login.yahoo.co.jp/.*');
        if (verified === null) return;
        window.location.replace(verified[0]);
      }
    } catch (err) {
      console.error('err:', err);
    }
  };

  return <YahooButton onClick={handleClick} />;
};

export { YahooLoginButton };
