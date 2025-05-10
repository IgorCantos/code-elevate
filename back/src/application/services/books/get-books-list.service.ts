import { Book } from "@/domain/entities";
import { IBookRepository } from "@/domain/repositories";
import { IBooksListResponse } from "@/domain/repositories/book/book-repository";
import { IBooksListService } from "@/domain/services";

class BooksListService implements IBooksListService {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async getBooksList(): Promise<IBooksListResponse> {
    const booksList = await this.booksRepository.getBooksList();
    return booksList;
  }
}

export default BooksListService;
