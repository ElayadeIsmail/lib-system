import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _script } from 'crypto';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { CreateLibrarianDto } from './dtos/librarion/create-librarian.dto';
import { Librarian } from './librarian.entity';

const script = promisify(_script);

@Injectable()
export class LibrarianService {
  constructor(
    @InjectRepository(Librarian) private librarianRepo: Repository<Librarian>,
  ) {}

  async createLibrarian(
    createLibrarianDto: CreateLibrarianDto,
  ): Promise<Librarian> {
    const { email, password } = createLibrarianDto;
    const librarian = await this.librarianRepo.find({ email });
    if (librarian.length) {
      throw new BadRequestException('Email On use');
    }

    // Hashing The Librarian Password

    // Generate Salt
    const salt = randomBytes(8).toString('hex');

    // Hash The Salt and The password together
    const hash = (await script(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    createLibrarianDto.password = result;

    const newLibrarian = this.librarianRepo.create(createLibrarianDto);

    return this.librarianRepo.save(newLibrarian);
  }
}
