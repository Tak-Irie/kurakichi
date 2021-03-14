import express from 'express';
import { OidcAuthService } from '../modules/services';
import { useSsoUserUseCase } from '../modules/user/useCases';
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

    const tokenSet = await OidcAuthService.verifyAuthCode(
      req,
      client,
      'https://localhost/yahoo/callback',
    );
    if (tokenSet === undefined) throw Error('token not exist');

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

export { yahooRouter };
