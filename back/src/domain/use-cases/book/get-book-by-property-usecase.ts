import IGetBookByPropertyService from "@/domain/interfaces/services/get-books-by-property-interface ";
import { IGetPaginatedBooksResponse } from "@/domain/repositories/book/book-repository";

class GetBookByPropertyUseCase {
  getBookByPropertyService: IGetBookByPropertyService;

  constructor(getBookByPropertyService: IGetBookByPropertyService) {
    this.getBookByPropertyService = getBookByPropertyService;
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
  }): Promise<IGetPaginatedBooksResponse | { message: string }> {
    const defaultPage = 1;
    const defaultLimit = 15;

    const actualPage = page || defaultPage;
    const actualLimit = limit || defaultLimit;

    const response = await this.getBookByPropertyService.execute({
      page: actualPage,
      limit: actualLimit,
      authors,
      genre,
    });

    if (!response) {
      return {
        message: "No book found.",
      };
    }

    return response;
  }
}

export default GetBookByPropertyUseCase;
