import { GetAllBooksService } from "@/application/services";
import { IGetAllBooksResponse } from "@/domain/repositories/book/book-repository";

class GetAllBooksUseCase {
  getAllBooksService: GetAllBooksService;

  constructor(getAllBooksService: GetAllBooksService) {
    this.getAllBooksService = getAllBooksService;
  }

  async execute(): Promise<IGetAllBooksResponse | { message: string }> {
    // TODO pagination logic
    const response = await this.getAllBooksService.execute();

    if (!response || response.data.length === 0) {
      return {
        message: "No books found.",
      };
    }

    return response;
  }
}

export default GetAllBooksUseCase;
