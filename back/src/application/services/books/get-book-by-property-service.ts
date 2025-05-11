import { Book } from "@/domain/entities";
import { IBookRepository } from "@/domain/repositories";
import { IGetAllBooksResponse } from "@/domain/repositories/book/book-repository";

class GetBookByPropertyService {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async execute({
    authors,
    genre,
  }: {
    authors?: string;
    genre?: string;
  }): Promise<IGetAllBooksResponse> {
    const filter = {
      ...(authors && { authors }),
      ...(genre && { genre }),
    } as unknown as Book;

    const booksList = await this.booksRepository.getBookByProperty(filter);
    return booksList;
  }
}

export default GetBookByPropertyService;
