/* eslint-disable @typescript-eslint/no-shadow */
import type { Request, Response } from 'express';
import type { Session, SessionData } from 'express-session';
import type { RedisPubSub } from 'graphql-redis-subscriptions';

declare module '@types/express-session' {
  interface SessionData {
    userId: string;
    authSession: string;
  }
}

declare module '@types/express-serve-static-core' {
  interface Request {
    session: Session & Partial<SessionData>;
  }
}

export interface MyContext {
  req: Request & { session: Session };
  res: Response;
}
export interface ApolloContext {
  req: Request & { session: Session };
  res: Response;
  idInCookie?: string;
  pubsub: RedisPubSub;
}
