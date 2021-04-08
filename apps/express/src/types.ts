import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
    authSession: string;
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    session: Session & Partial<SessionData>;
  }
}

export type IDs =
  | {
      id: string;
    }[]
  | undefined;
