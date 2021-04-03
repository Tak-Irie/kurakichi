import { Request } from 'express';
import { Client, generators, TokenSet } from 'openid-client';
import { Cryptograph } from '@kurakichi/node-util';
import { RedisAuthService } from './RedisAuthService';

type GetAuthUrlArg = {
  client: Client;
  state: string;
  nonce: string;
  code_challenge: string;
};

class OidcAuthService {
  public static async createAuthReq(client: Client, sessionId: string): Promise<string> {
    const { state, nonce, code_verifier, code_challenge } = this.generateParams();

    await RedisAuthService.storeAuthParam({
      sessionId,
      state,
      nonce,
      code_verifier,
    });

    const authUrl = this.getAuthUrl({
      client,
      state,
      nonce,
      code_challenge,
    });

    return authUrl;
  }

  public static async verifyAuthCode(req: Request, client: Client, redirect_uri: string) {
    const storedParams = await RedisAuthService.getStoredAuthParam(
      req.session.authSession as string,
    );

    if (storedParams == undefined || storedParams[0] == undefined) return undefined;

    const [storedState, storedNonce, storedCode_verifier] = storedParams;
    const param = client.callbackParams(req);

    const tokenSet = await client.callback(redirect_uri, param, {
      state: storedState as string,
      nonce: storedNonce as string,
      code_verifier: storedCode_verifier as string,
    });

    return tokenSet;
  }

  public static async getUserInfo(client: Client, tokenSet: TokenSet) {
    const userInfo = await client.userinfo(tokenSet);
    return userInfo;
  }

  // TODO:add storage limitation
  public static async storeAndCryptTokenSet(tokenSet: TokenSet) {
    // console.log('catch process:encryptToken');
    const token = tokenSet.claims();

    // console.log('token:', token);
    const encryptedToken = Cryptograph.encrypt(JSON.stringify(token));

    // console.log('encryptedToken:', encryptedToken);
    const result = await RedisAuthService.storeTokenSet({
      iv: encryptedToken.iv,
      encryptedToken: encryptedToken.encryptedData,
      sub: token.sub,
    });

    return result;
  }

  // TODO:use it ?
  public static async getAndDecryptTokenSet(sub: string) {
    try {
      const cryptedToken = await RedisAuthService.getTokenSet(sub);
      if (cryptedToken === undefined) throw Error('no match token');
      const { iv, token } = cryptedToken;
      const plainToken = Cryptograph.decrypt(iv as string, token as string);
      return JSON.parse(plainToken);
    } catch (err) {
      console.log('err:', err);
    }
  }

  private static generateParams() {
    const state = generators.state();
    const nonce = generators.nonce();
    const code_verifier = generators.codeVerifier();
    const code_challenge = generators.codeChallenge(code_verifier);

    return { state, nonce, code_verifier, code_challenge };
  }

  private static getAuthUrl(arg: GetAuthUrlArg): string {
    const { client, code_challenge, nonce, state } = { ...arg };
    const authUrl = client.authorizationUrl({
      scope: 'openid email',
      state,
      nonce,
      code_challenge,
      code_challenge_method: 'S256',
      prompt: 'consent',
      display: 'page',
      max_age: 3600,
    });
    return authUrl;
  }
}

export { OidcAuthService };
