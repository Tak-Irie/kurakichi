import { CRYPT_PASS, CRYPT_SALT } from '../util/Constants';
import {
  createGoogleClient,
  createYahooClient,
} from '../util/createOidcClient';
import { createRedis } from '../util/createRedis';
import { OidcAuthService } from './OidcService';

type SSOLoginArg = {
  provider: string;
  sessionID: string;
};

export const ssoLogin = async ({
  provider,
  sessionID,
}: SSOLoginArg): Promise<string> => {
  const redisUrl = process.env.REDIS_URL || 'redis://0.0.0.0:6379';
  const oidc = OidcAuthService.createService({
    redisClient: createRedis(redisUrl),
    password: CRYPT_PASS,
    salt: CRYPT_SALT,
  });

  if (provider === 'GOOGLE') {
    const client = await createGoogleClient();
    const authUrl = await oidc.createAuthReq(client, sessionID);
    return authUrl;
  }

  if (provider === 'YAHOO') {
    const client = await createYahooClient();
    const authUrl = await oidc.createAuthReq(client, sessionID);
    return authUrl;
  }
  return 'ERROR';
};
