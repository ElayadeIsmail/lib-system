import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MyContext } from 'src/types';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dtos/auth/login.dto';
import { CreateLibrarianDto } from './dtos/librarion/create-librarian.dto';
import { Librarian } from './librarian.entity';
import { LibrarianService } from './librarian.service';

@Resolver((of) => Librarian)
export class LibrarianResolver {
  constructor(
    private libraryService: LibrarianService,
    private authService: AuthService,
  ) {}

  @Mutation(() => Librarian)
  createLibrarian(
    @Args('createLibrarianInput') createLibrarianInput: CreateLibrarianDto,
  ): Promise<Librarian> {
    return this.libraryService.createLibrarian(createLibrarianInput);
  }

  @Mutation(() => Librarian)
  async login(
    @Args('loginInput') loginInput: LoginInputDto,
    @Context() { req }: MyContext,
  ): Promise<Librarian> {
    const librarian = await this.authService.signin(
      loginInput.email,
      loginInput.password,
    );

    req.session.userId = librarian.id;
    return librarian;
  }

  @Query(() => Librarian)
  whoAmI(@Context() { req }: MyContext) {
    const userId = req.session.userId;
    return this.libraryService.findOne(userId);
  }
}
