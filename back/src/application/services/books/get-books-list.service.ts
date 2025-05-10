import { Book } from "@/domain/entities";
import { IBookRepository } from "@/domain/repositories";
import { IBooksListService } from "@/domain/services";

class BooksListService implements IBooksListService {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async getBooksList(): Promise<Book[] | []> {
    const booksList = await this.booksRepository.getBooksList();
    return booksList;
  }
}

export default BooksListService;
