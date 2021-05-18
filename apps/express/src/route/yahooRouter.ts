import * as express from 'express';
import { OidcAuthService, useSsoUserUseCase } from '@kurakichi/domain';
import { memoizedYahooClient } from '../util/memoize';

const yahooRouter = express.Router();

yahooRouter.get('/login', async (req, res) => {
  const client = await memoizedYahooClient();
  const authUrl = await OidcAuthService.createAuthReq(client, req.sessionID);

  req.session.authSession = req.sessionID;

  return res.send(authUrl);
});

yahooRouter.get('/callback', async (req, res) => {
  try {
    const client = await memoizedYahooClient();

    // console.log('CbSession:', req.session);

    const tokenSet = await OidcAuthService.verifyAuthCode(
      req,
      client,
      'http://localhost:4000/yahoo/callback',
    );

    if (tokenSet === undefined) throw Error('token not exist');

    const storeTokenResult = await OidcAuthService.storeAndCryptTokenSet(tokenSet);
    if (storeTokenResult !== 'OK') throw Error('fail to store token');

    req.session.authSession = undefined;

    const userInfo = await OidcAuthService.getUserInfo(client, tokenSet);

    const result = await useSsoUserUseCase.execute({
      ssoSub: userInfo.sub,
      email: userInfo.email as string,
      avatar: userInfo.picture,
    });

    if (result.isLeft()) return res.send(result.value.getErrorValue());

    const value = result.value.getValue();

    req.session.userId = value.id;

    res.redirect('http://localhost:4200/auth/success');
  } catch (err) {
    console.log('err:', err);
    res.redirect('http://localhost:4200/auth/fail');
  }
});

export { yahooRouter };
