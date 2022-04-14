import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';

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
  idInCookie?: string;
}
