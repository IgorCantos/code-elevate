import { HttpError } from "@/domain/exceptions";
import { IGetBookByPropertyService } from "@/domain/interfaces";
import { IGetPaginatedBooksResponse } from "@/domain/repositories";
import HttpStatus from "@/infraestructure/utils/http-status";

class GetBookByPropertyUseCase {
  getBookByPropertyService: IGetBookByPropertyService;

  constructor(getBookByPropertyService: IGetBookByPropertyService) {
    this.getBookByPropertyService = getBookByPropertyService;
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

    const actualPage = page || defaultPage;
    const actualLimit = limit || defaultLimit;

    const response = await this.getBookByPropertyService.execute({
      page: actualPage,
      limit: actualLimit,
      author,
      genre,
    });

    if (!response.data.length) {
      throw new HttpError("No books found.", HttpStatus.NOT_FOUND);
    }

    return response;
  }
}

export default GetBookByPropertyUseCase;
