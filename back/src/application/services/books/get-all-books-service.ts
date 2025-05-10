import { IBookRepository } from "@/domain/repositories";
import { IGetAllBooksResponse } from "@/domain/repositories/book/book-repository";

class GetAllBooksService {
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
