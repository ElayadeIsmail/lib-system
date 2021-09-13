import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';

export type SessionType = Session & Partial<SessionData> & { userId?: number };
export type MyContext = {
  req: Request & {
    session: SessionType;
  };
  res: Response;
};
