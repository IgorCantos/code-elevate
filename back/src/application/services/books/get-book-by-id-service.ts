import { Book } from "@/domain/entities";
import { IBookRepository } from "@/domain/repositories";

class GetBookByPropertyService {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async execute(): Promise<Book | null> {
    const booksList = await this.booksRepository.getBookById();
    return booksList;
  }
}

export default GetBookByPropertyService;
