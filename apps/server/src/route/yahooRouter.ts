import { useSsoUserUsecase } from '@kurakichi/domain';
import { Router } from 'express';
import { OidcAuthService } from '../service/OidcService';
import {
  CRYPT_PASS,
  CRYPT_SALT,
  SSO_REDIRECT_FAIL,
  SSO_REDIRECT_SUCCESS,
} from '../util/Constants';
import { createYahooClient } from '../util/createOidcClient';
import { createRedis } from '../util/createRedis';

const yahooRouter = Router();

yahooRouter.get('/callback', async (req, res) => {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://0.0.0.0:6379';

    const oidc = OidcAuthService.createService({
      redisClient: createRedis(redisUrl),

      password: CRYPT_PASS,
      salt: CRYPT_SALT,
    });
    const client = await createYahooClient();

    // FIXME:
    const tokenSet = await oidc.verifyAuthCode({
      req,
      client,
      callback_uri:
        process.env.YAHOO_OIDC_CLIENT_REDIRECT ||
        'http://localhost:4000/yahoo/callback',
    });
    if (tokenSet === false) throw Error('token not exist');

    console.log('tokenSet:', tokenSet);

    const storeTokenResult = await oidc.storeAndCryptTokenSet(tokenSet);
    if (storeTokenResult !== 'OK') throw Error('fail to store token');

    req.session.authSession = undefined;

    console.log('storeToken:', storeTokenResult);

    const userInfo = await oidc.getUserInfo(client, tokenSet);

    console.log('userInfo:', userInfo);

    const result = await useSsoUserUsecase.execute({
      ssoSub: userInfo.sub,
      email: userInfo.email as string,
      avatar: userInfo.picture,
    });

    if (result.isLeft()) {
      console.error('err:', result.value.getErrorValue());
      return res.redirect(SSO_REDIRECT_FAIL);
    }

    const value = result.value.getValue();

    req.session.userId = value.id;

    return res.redirect(SSO_REDIRECT_SUCCESS);
  } catch (err) {
    console.log('err:', err);
    return res.redirect(SSO_REDIRECT_FAIL);
  }
});

export { yahooRouter };
