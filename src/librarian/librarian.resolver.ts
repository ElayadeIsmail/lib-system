import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/auth.guard';
import { MyContext } from 'src/types';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/currentuser.decorator';
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
    console.log('currentUser', req.currentUser);
    console.log('userId', req.session.userId);
    return req.currentUser;
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  test(@CurrentUser() user: Librarian) {
    return 'dONE';
  }
}
