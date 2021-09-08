import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { scrypt as _script } from 'crypto';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { Librarian } from './librarian.entity';

const scrypt = promisify(_script);
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Librarian) private librarianRepo: Repository<Librarian>,
  ) {}

  async signin(email: string, password: string) {
    const librarians = await this.librarianRepo.find({ email });
    if (!librarians.length) {
      throw new BadRequestException('Invalid Credentials');
    }
    const librarian = librarians[0];
    const [salt, storedHash] = librarian.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Invalid Credentials');
    }
    return librarian;
  }
}
