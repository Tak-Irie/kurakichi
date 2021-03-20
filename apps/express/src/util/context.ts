import { Request, Response } from 'express';
import { Session } from 'express-session';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export interface Context {
  req: Request & { session: Session };
  res: Response;
  pubsub: RedisPubSub;
}
