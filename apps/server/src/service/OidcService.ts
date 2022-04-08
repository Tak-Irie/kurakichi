import { Request } from "express";
import { Redis } from "ioredis";
import { Client, TokenSet, generators, UserinfoResponse } from "openid-client";

import { Cryptograph } from "@kurakichi/modules";
import { AuthService } from "./AuthService";

// FIXME:These services temporally created.it must be written in modules/*

type GetAuthUrlArg = {
  client: Client;
  state: string;
  nonce: string;
  code_challenge: string;
};

type AuthParam = {
  state: string;
  nonce: string;
  code_verifier: string;
  code_challenge: string;
};

type CreateServiceArg = {
  redisClient: Redis;
  password: string;
  salt: string;
};

type VerifyAuthCodeArg = {
  req: Request;
  client: Client;
  callback_uri: string;
};

type UserInfo = {
  sub: string;
  email?: string;
  picture?: string;
};
type Address = {
  formatted?: string;
  street_address?: string;
  locality?: string;
  region?: string;
  postal_code?: string;
  country?: string;
};

class OidcAuthService {
  private authService;
  private crypt;

  constructor(authService: AuthService, crypt: Cryptograph) {
    this.authService = authService;
    this.crypt = crypt;
  }

  public static createService({
    redisClient,
    password,
    salt,
  }: CreateServiceArg) {
    const auth = new AuthService(redisClient);
    const crypt = new Cryptograph({ password, salt });

    return new OidcAuthService(auth, crypt);
  }

  public async createAuthReq(
    client: Client,
    sessionId: string
  ): Promise<string> {
    const { state, nonce, code_verifier, code_challenge } =
      this.generateParams();

    await this.authService.storeAuthParam({
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

  public async verifyAuthCode({
    req,
    client,
    callback_uri,
  }: VerifyAuthCodeArg) {
    //
    if (!req.session.authSession) return false;
    const storedParams = await this.authService.getStoredAuthParam(
      req.session.authSession
    );

    if (storedParams === false) return false;

    const [storedState, storedNonce, storedCode_verifier] = storedParams;
    const param = client.callbackParams(req);

    const tokenSet = await client.callback(callback_uri, param, {
      state: storedState,
      nonce: storedNonce,
      code_verifier: storedCode_verifier,
    });

    return tokenSet;
  }

  public async getUserInfo(client: Client, tokenSet: TokenSet) {
    const userInfo = await client.userinfo<UserInfo, Address>(tokenSet);
    return userInfo;
  }

  // TODO:add storage limitation
  public async storeAndCryptTokenSet(tokenSet: TokenSet) {
    // console.log('catch process:encryptToken');
    const token = tokenSet.claims();

    // console.log('token:', token);
    const encryptedToken = this.crypt.encrypt(JSON.stringify(token));

    // console.log('encryptedToken:', encryptedToken);
    const result = await this.authService.storeTokenSet({
      iv: encryptedToken.iv,
      encryptedToken: encryptedToken.encryptedData,
      uniqueSubject: token.sub,
    });

    return result;
  }

  // TODO:use it ?
  public async getAndDecryptTokenSet(sub: string) {
    try {
      const cryptedToken = await this.authService.getTokenSet(sub);
      if (cryptedToken === undefined) throw Error("no match token");
      const { iv, token } = cryptedToken;
      const plainToken = this.crypt.decrypt(iv as string, token as string);
      return JSON.parse(plainToken);
    } catch (err) {
      console.log("err:", err);
    }
  }

  private generateParams(): AuthParam {
    const state = generators.state();
    const nonce = generators.nonce();
    const code_verifier = generators.codeVerifier();
    const code_challenge = generators.codeChallenge(code_verifier);

    return { state, nonce, code_verifier, code_challenge };
  }

  private getAuthUrl(arg: GetAuthUrlArg): string {
    const { client, code_challenge, nonce, state } = arg;
    const authUrl = client.authorizationUrl({
      scope: "openid email",
      state,
      nonce,
      code_challenge,
      code_challenge_method: "S256",
      prompt: "consent",
      display: "page",
      max_age: 3600,
    });
    return authUrl;
  }
}

export { OidcAuthService };
