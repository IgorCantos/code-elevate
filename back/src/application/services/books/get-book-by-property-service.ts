import { IBookRepository } from "@/domain/repositories";
import { IGetAllBooksResponse } from "@/domain/repositories/book/book-repository";

class GetBookByPropertyService {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async execute({
    page,
    limit,
    authors,
    genre,
  }: {
    page: number;
    limit: number;
    authors?: string;
    genre?: string;
  }): Promise<IGetAllBooksResponse> {
    const filter = {
      page,
      limit,
      ...(authors && { authors }),
      ...(genre && { genre }),
    };

    const booksList = await this.booksRepository.getBookByProperty(filter);
    return booksList;
  }
}

export default GetBookByPropertyService;
