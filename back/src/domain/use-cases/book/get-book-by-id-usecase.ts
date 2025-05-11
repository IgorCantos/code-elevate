import { GetBookByIdService } from "@/application/services";
import { Book } from "@/domain/entities";

class GetBookByIdUseCase {
  getBookByIdService: GetBookByIdService;

  constructor(getBookByIdService: GetBookByIdService) {
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
