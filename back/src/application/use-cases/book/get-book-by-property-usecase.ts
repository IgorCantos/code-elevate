import { HttpError } from "@/application/exceptions";
import {
  IBookRepository,
  IGetPaginatedBooksResponse,
} from "@/domain/repositories";
import HttpStatus from "@/infraestructure/utils/http-status";

class GetBookByPropertyUseCase {
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
  }): Promise<IGetPaginatedBooksResponse | Error> {
    const defaultPage = 1;
    const defaultLimit = 15;

    const filter = {
      page: page || defaultPage,
      limit: limit || defaultLimit,
      ...(author && { author }),
      ...(genre && { genre }),
    };

    const response = await this.booksRepository.getBookByProperty(filter);

    if (!response.data.length) {
      throw new HttpError("No books found.", HttpStatus.NOT_FOUND);
    }

    return response;
  }
}

export default GetBookByPropertyUseCase;
