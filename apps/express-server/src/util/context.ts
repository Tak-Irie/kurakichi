import { Request, Response } from 'express';
import { Session } from 'express-session';
import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export interface Context {
  req: Request & { session: Session };
  res: Response;
  prisma: PrismaClient;
  redis: Redis;
  pubsub: RedisPubSub;
}
