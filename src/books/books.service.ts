import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepo: Repository<Book>) {}

  createBook(bookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepo.create(bookDto);
    return this.booksRepo.save(book);
  }
}
