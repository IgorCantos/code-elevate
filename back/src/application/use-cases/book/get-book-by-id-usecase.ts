import { Book } from "@/domain/entities";
import { HttpError } from "@/application/exceptions";
import { IBookRepository } from "@/domain/repositories";
import HttpStatus from "@/infraestructure/utils/http-status";

class GetBookByIdUseCase {
  booksRepository: IBookRepository;

  constructor(booksRepository: IBookRepository) {
    this.booksRepository = booksRepository;
  }

  async execute({ id }: { id: string }): Promise<Book | Error> {
    const response = await this.booksRepository.getBookById({ id });

    if (Array.isArray(response) && response.length === 0) {
      throw new HttpError("No books found.", HttpStatus.NOT_FOUND);
    }

    console.log("response >>", response);
    return response as Book;
  }
}

export default GetBookByIdUseCase;
