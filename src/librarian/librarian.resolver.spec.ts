import { Test, TestingModule } from '@nestjs/testing';
import { LibrarianResolver } from './librarian.resolver';

describe('LibrarianResolver', () => {
  let resolver: LibrarianResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibrarianResolver],
    }).compile();

    resolver = module.get<LibrarianResolver>(LibrarianResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
