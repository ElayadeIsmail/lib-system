import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class BooksResolver {
  @Query(() => String)
  sayHello() {
    return 'Hello World';
  }
}
