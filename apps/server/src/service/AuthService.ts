import { Redis } from "ioredis";

// FIXME:These services temporally created.it must be written in modules/*

type StoreAuthArg = {
  sessionId: string;
  state: string;
  nonce: string;
  code_verifier: string;
};

type StoreTokenSetArg = {
  encryptedToken: string;
  iv: string;
  uniqueSubject: string;
};

class AuthService {
  private client;
  constructor(client: Redis) {
    this.client = client;
  }

  public async storeAuthParam(arg: StoreAuthArg) {
    const { sessionId, state, code_verifier, nonce } = arg;

    await this.client.hset(`auth:${sessionId}`, {
      state: state,
      nonce: nonce,
      code_verifier: code_verifier,
    });
  }

  public async getStoredAuthParam(sessionId: string) {
    // console.log('ses:', sessionId);
    const storedParam = await this.client.hmget(
      `auth:${sessionId}`,
      "state",
      "nonce",
      "code_verifier"
    );

    // console.log('stored:', storedParam);
    if (storedParam.includes(null) === true) return false;

    const result = await this.deleteStoredAuthParam(sessionId);
    if (result === false) return false;
    return storedParam as string[];
  }

  private async deleteStoredAuthParam(sessionId: string) {
    const result = await this.client.del(`auth:${sessionId}`);
    if (result === 1) return true;
    else {
      return false;
    }
  }

  public async storeTokenSet(arg: StoreTokenSetArg) {
    const result = await this.client.hmset(`token:${arg.uniqueSubject}`, {
      token: arg.encryptedToken,
      iv: arg.iv,
    });
    return result;
  }

  public async getTokenSet(uniqueSubject: string) {
    const cryptedToken = await this.client.hmget(
      `token:${uniqueSubject}`,
      "token",
      "iv"
    );
    if (cryptedToken.includes(null) === true) return undefined;
    const [token, iv] = [...cryptedToken];
    return { token, iv };
  }

  // used for reset password
  public async storePasswordToken(userId: string, changePassToken: string) {
    const result = await this.client.set(
      `forgetPassword:${userId}`,
      changePassToken,
      "ex",
      60 * 60 //1hour
    );
    if (result === null) return false;
    return true;
  }
}

export { AuthService };
