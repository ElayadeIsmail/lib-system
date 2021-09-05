import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLibrarianDto } from './dtos/librarion/create-librarian.dto';
import { Librarian } from './librarian.entity';
import { LibrarianService } from './librarian.service';

@Resolver((of) => Librarian)
export class LibrarianResolver {
  constructor(private libraryService: LibrarianService) {}

  @Mutation(() => Librarian)
  createLibrarian(
    @Args('createLibrarianInput') createLibrarianInput: CreateLibrarianDto,
  ): Promise<Librarian> {
    return this.libraryService.createLibrarian(createLibrarianInput);
  }

  @Query(() => [Librarian])
  getAllLibrarians() {
    return this.libraryService.findAll();
  }
}
