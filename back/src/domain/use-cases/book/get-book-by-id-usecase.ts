import { Book } from "@/domain/entities";
import IGetBookByIdService from "@/domain/interfaces/services/get-books-by-id-interface ";

class GetBookByIdUseCase {
  getBookByIdService: IGetBookByIdService;

  constructor(getBookByIdService: IGetBookByIdService) {
    this.getBookByIdService = getBookByIdService;
  }

  async execute({ id }: { id: string }): Promise<Book | { message: string }> {
    const response = await this.getBookByIdService.execute({ id });

    if (!response) {
      return {
        message: "No book found.",
      };
    }

    return response;
  }
}

export default GetBookByIdUseCase;
