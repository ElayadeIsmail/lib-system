import { Module } from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { LibrarianResolver } from './librarian.resolver';

@Module({
  providers: [LibrarianService, LibrarianResolver]
})
export class LibrarianModule {}
