import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LibrarianResolver } from './librarian.resolver';
import { LibrarianService } from './librarian.service';

@Module({
  providers: [LibrarianService, LibrarianResolver, AuthService],
})
export class LibrarianModule {}
