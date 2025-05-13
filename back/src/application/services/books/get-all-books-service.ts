import { IBookRepository } from "@/domain/repositories";
import { IGetPaginatedBooksResponse } from "@/domain/repositories/book/book-repository";

class GetAllBooksService {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async execute({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<IGetPaginatedBooksResponse> {
    const booksList = await this.booksRepository.getAllBooks({ page, limit });
    return booksList;
  }
}

export default GetAllBooksService;
