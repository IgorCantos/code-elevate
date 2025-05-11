import { Book } from "@/domain/entities";
import { IBookRepository } from "@/domain/repositories";

class GetBookByIdService {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async execute({ id }: { id: string }): Promise<Book | null> {
    const booksList = await this.booksRepository.getBookById({ id });
    return booksList;
  }
}

export default GetBookByIdService;
