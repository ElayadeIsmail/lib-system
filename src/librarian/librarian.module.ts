import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Librarian } from './librarian.entity';
import { LibrarianResolver } from './librarian.resolver';
import { LibrarianService } from './librarian.service';

@Module({
  imports: [TypeOrmModule.forFeature([Librarian])],
  providers: [LibrarianService, LibrarianResolver, AuthService],
})
export class LibrarianModule {}
