import { redis } from '../util/redisClient';

type StoreAuthArg = {
  sessionId: string;
  state: string;
  nonce: string;
  code_verifier: string;
};

type StoreTokenSetArg = {
  encryptedToken: string;
  iv: string;
  sub: string;
};

class RedisAuthService {
  public static async storeAuthParam(arg: StoreAuthArg) {
    const { sessionId, state, code_verifier, nonce } = { ...arg };

    await redis.hmset(`auth:${sessionId}`, {
      state: state,
      nonce: nonce,
      code_verifier: code_verifier,
    });
  }

  public static async getStoredAuthParam(sessionId: string) {
    const storedParam = await redis.hmget(`auth:${sessionId}`, 'state', 'nonce', 'code_verifier');

    if (storedParam.includes(null) === true) return undefined;
    const result = await this.deleteStoredAuthParam(sessionId);
    if (result === false) return undefined;
    return storedParam as string[];
  }

  public static async deleteStoredAuthParam(sessionId: string) {
    const result = await redis.del(`auth:${sessionId}`);
    if (result === 1) return true;
    else {
      return false;
    }
  }

  public static async storeTokenSet(arg: StoreTokenSetArg) {
    const result = await redis.hmset(`token:${arg.sub}`, {
      token: arg.encryptedToken,
      iv: arg.iv,
    });
    return result;
  }

  public static async getTokenSet(sub: string) {
    const cryptedToken = await redis.hmget(`token:${sub}`, 'token', 'iv');
    if (cryptedToken.includes(null) === true) return undefined;
    const [token, iv] = [...cryptedToken];
    return { token, iv };
  }

  public static async storePasswordToken(userId: string, changePassToken: string) {
    const result = await redis.set(
      `forgetPassword:${userId}`,
      changePassToken,
      'ex',
      60 * 60, //1hour
    );
    if (result === null) return false;
    return true;
  }
}

export { RedisAuthService };
