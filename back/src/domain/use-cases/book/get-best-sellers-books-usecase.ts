import { HttpError } from "@/domain/exceptions";
import {
  IBookRepository,
  IGetPaginatedBooksResponse,
} from "@/domain/repositories";
import HttpStatus from "@/infraestructure/utils/http-status";

class GetBestSellersBooksUseCase {
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
  }): Promise<IGetPaginatedBooksResponse | Error> {
    const defaultPage = 1;
    const defaultLimit = 15;

    const actualPage = page || defaultPage;
    const actualLimit = limit || defaultLimit;

    const response = await this.booksRepository.getBestSellersBooks({
      page: actualPage,
      limit: actualLimit,
    });

    if (!response.data.length) {
      throw new HttpError("No books found.", HttpStatus.NOT_FOUND);
    }

    return response;
  }
}

export default GetBestSellersBooksUseCase;
