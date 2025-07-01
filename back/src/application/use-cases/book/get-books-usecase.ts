import { HttpError } from "@/application/exceptions";
import {
  IBookRepository,
  IGetPaginatedBooksResponse,
} from "@/domain/repositories";
import HttpStatus from "@/infraestructure/utils/http-status";

class GetAllBooksUseCase {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async execute({
    page,
    limit,
    title,
  }: {
    page: number;
    limit: number;
    title: string;
  }): Promise<IGetPaginatedBooksResponse | Error> {
    const defaultPage = 1;
    const defaultLimit = 15;

    const actualPage = page || defaultPage;
    const actualLimit = limit || defaultLimit;

    const response = await this.booksRepository.getBooks({
      page: actualPage,
      limit: actualLimit,
      title,
    });

    if (!response.data.length) {
      throw new HttpError("No books found.", HttpStatus.NOT_FOUND);
    }

    return response;
  }
}

export default GetAllBooksUseCase;
