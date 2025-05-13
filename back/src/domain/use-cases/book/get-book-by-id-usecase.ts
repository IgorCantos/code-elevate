import { Book } from "@/domain/entities";
import { HttpError } from "@/domain/exceptions";
import { IGetBookByIdService } from "@/domain/interfaces";
import HttpStatus from "@/infraestructure/utils/http-status";

class GetBookByIdUseCase {
  getBookByIdService: IGetBookByIdService;

  constructor(getBookByIdService: IGetBookByIdService) {
    this.getBookByIdService = getBookByIdService;
  }

  async execute({ id }: { id: string }): Promise<Book | Error> {
    const response = await this.getBookByIdService.execute({ id });

    if (Array.isArray(response) && response.length === 0) {
      throw new HttpError("No books found.", HttpStatus.NOT_FOUND);
    }

    return response as Book;
  }
}

export default GetBookByIdUseCase;
