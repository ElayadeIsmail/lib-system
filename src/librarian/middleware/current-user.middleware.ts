import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Librarian } from 'src/librarian/librarian.entity';
import { LibrarianService } from 'src/librarian/librarian.service';
import { SessionType } from '../../types';

declare global {
  namespace Express {
    interface Request {
      currentUser?: Librarian;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private librarianService: LibrarianService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = ((await req.session) as SessionType) || {};
    if (userId) {
      const librarian = await this.librarianService.findOne(userId);
      req.currentUser = librarian;
    }
    next();
  }
}
