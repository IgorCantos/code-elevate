import { IBookRepository } from "@/domain/repositories";
import { IGetPaginatedBooksResponse } from "@/domain/repositories/book/book-repository";

class GetBookByPropertyService {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async execute({
    page,
    limit,
    author,
    genre,
  }: {
    page: number;
    limit: number;
    author?: string;
    genre?: string;
  }): Promise<IGetPaginatedBooksResponse> {
    const filter = {
      page,
      limit,
      ...(author && { author }),
      ...(genre && { genre }),
    };

    const booksList = await this.booksRepository.getBookByProperty(filter);
    return booksList;
  }
}

export default GetBookByPropertyService;
