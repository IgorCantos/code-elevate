import { IBookRepository } from "@/domain/repositories";
import { IGetAllBooksResponse } from "@/domain/repositories/book/book-repository";
import { IGetAllBooksService } from "@/domain/services";

class GetAllBooksService implements IGetAllBooksService {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async execute(): Promise<IGetAllBooksResponse> {
    const booksList = await this.booksRepository.getAllBooks();
    return booksList;
  }
}

export default GetAllBooksService;
