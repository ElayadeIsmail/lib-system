import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';

@Resolver((of) => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}
  @Query(() => String)
  sayHello() {
    return 'Hello World';
  }

  @Mutation(() => Book)
  createBook(
    @Args('createBookInput') createBookInput: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.createBook(createBookInput);
  }
}
