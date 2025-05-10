import { GetBookByPropertyService } from "@/application/services";
import { Book } from "@/domain/entities";

class GetBookByIdUseCase {
  getBookByPropertyService: GetBookByPropertyService;

  constructor(getBookByPropertyService: GetBookByPropertyService) {
    this.getBookByPropertyService = getBookByPropertyService;
  }

  async execute(): Promise<Book | { message: string }> {
    const response = await this.getBookByPropertyService.execute();

    if (!response) {
      return {
        message: "No book found.",
      };
    }

    return response;
  }
}

export default GetBookByIdUseCase;
