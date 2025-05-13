import { IGetAllBooksService } from "@/domain/interfaces";
import { IGetPaginatedBooksResponse } from "@/domain/repositories/book/book-repository";

class GetAllBooksUseCase {
  getAllBooksService: IGetAllBooksService;

  constructor(getAllBooksService: IGetAllBooksService) {
    this.getAllBooksService = getAllBooksService;
  }

  async execute({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<IGetPaginatedBooksResponse | { message: string }> {
    const defaultPage = 1;
    const defaultLimit = 15;

    const actualPage = page || defaultPage;
    const actualLimit = limit || defaultLimit;

    const response = await this.getAllBooksService.execute({
      page: actualPage,
      limit: actualLimit,
    });

    if (!response) {
      return {
        message: "No books found.",
      };
    }

    return response;
  }
}

export default GetAllBooksUseCase;
