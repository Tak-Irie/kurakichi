import { Router } from "express";
import { OidcAuthService } from "../service/OidcService";
import {
  CRYPT_PASS,
  CRYPT_SALT,
  SSO_REDIRECT_FAIL,
  SSO_REDIRECT_SUCCESS,
} from "../util/Constants";
import { createGoogleClient } from "../util/createOidcClient";
import { redis } from "../util/createRedis";

const googleRouter = Router();

googleRouter.get("/login", async (req, res) => {
  const oidc = OidcAuthService.createService({
    redisClient: redis,
    password: CRYPT_PASS,
    salt: CRYPT_SALT,
  });

  const client = await createGoogleClient();
  const authUrl = await oidc.createAuthReq(client, req.sessionID);

  req.session.authSession = req.sessionID;

  return res.send(authUrl);
});

// TODO:
googleRouter.get("/redirect", async (req, res) => {
  return res.send("wait");
});

googleRouter.get("/callback", async (req, res) => {
  try {
    const oidc = OidcAuthService.createService({
      redisClient: redis,
      password: CRYPT_PASS,
      salt: CRYPT_SALT,
    });
    const client = await createGoogleClient();

    const tokenSet = await oidc.verifyAuthCode({
      req,
      client,
      callback_uri: "http://localhost:4000/google/callback",
    });
    if (tokenSet === false) throw Error("token not exist");

    // console.log('tokenSet:', tokenSet);

    const storeTokenResult = await oidc.storeAndCryptTokenSet(tokenSet);
    if (storeTokenResult !== "OK") throw Error("fail to store token");

    req.session.authSession = undefined;

    // console.log('storeToken:', storeTokenResult);

    const userInfo = await oidc.getUserInfo(client, tokenSet);

    // console.log('userInfo:', userInfo);

    const result = await useSsoUserUseCase.execute({
      ssoSub: userInfo.sub,
      email: userInfo.email as string,
      avatar: userInfo.picture,
    });

    if (result.isLeft()) return res.send(result.value.getErrorValue());

    const value = result.value.getValue();

    req.session.userId = value.id;

    res.redirect(SSO_REDIRECT_SUCCESS);
  } catch (err) {
    console.log("err:", err);
    res.redirect(SSO_REDIRECT_FAIL);
  }
});

export { googleRouter };
