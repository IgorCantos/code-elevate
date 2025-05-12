import { GetAllBooksService } from "@/application/services";
import { IGetAllBooksResponse } from "@/domain/repositories/book/book-repository";

class GetAllBooksUseCase {
  getAllBooksService: GetAllBooksService;

  constructor(getAllBooksService: GetAllBooksService) {
    this.getAllBooksService = getAllBooksService;
  }

  async execute({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<IGetAllBooksResponse | { message: string }> {
    const response = await this.getAllBooksService.execute({ page, limit });

    if (!response || response.data.length === 0) {
      return {
        message: "No books found.",
      };
    }

    return response;
  }
}

export default GetAllBooksUseCase;
