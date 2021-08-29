import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepo: Repository<Book>,
    private categoriesService: CategoriesService,
  ) {}

  async createBook(createBookInput: CreateBookDto): Promise<Book> {
    const book = this.booksRepo.create(createBookInput);
    const category = await this.categoriesService.getCategoryById(
      createBookInput.categoryId,
    );
    if (!category) {
      throw new BadRequestException('Category Does Not Exist');
    }
    book.category = category;
    return this.booksRepo.save(book);
  }
}
