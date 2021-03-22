import * as express from 'express';
import { OidcAuthService, useSsoUserUseCase } from '@kurakichi/domain';
import { memoizedGoogleClient } from '../util/memoize';

const googleRouter = express.Router();

googleRouter.get('/login', async (req, res) => {
  const client = await memoizedGoogleClient();
  const authUrl = await OidcAuthService.createAuthReq(client, req.sessionID);

  req.session.authSession = req.sessionID;

  return res.send(authUrl);
});

googleRouter.get('/callback', async (req, res) => {
  try {
    const client = await memoizedGoogleClient();

    const tokenSet = await OidcAuthService.verifyAuthCode(
      req,
      client,
      'https://localhost/google/callback',
    );
    if (tokenSet === undefined) throw Error('token not exist');

    const storeTokenResult = await OidcAuthService.storeAndCryptTokenSet(tokenSet);
    if (storeTokenResult !== 'OK') throw Error('fail to store token');

    req.session.authSession = undefined;

    const userInfo = await OidcAuthService.getUserInfo(client, tokenSet);

    const result = await useSsoUserUseCase.execute({
      ssoSub: userInfo.sub,
      email: userInfo.email as string,
      picture: userInfo.picture,
    });

    if (result.isLeft()) return res.send(result.value.getErrorValue());

    const value = result.value.getValue();

    req.session.userId = value.id;

    res.redirect('http://localhost:4200/auth/success');
  } catch (err) {
    console.log('err:', err);
    res.send('http://localhost:4200/auth/fail');
  }
});

export { googleRouter };
