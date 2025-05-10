import { Book } from "@/domain/entities";
import { IBooksListResponse } from "@/domain/repositories/book/book-repository";
import { IBooksListService } from "@/domain/services";

class BooksListUseCase {
  booksListService: IBooksListService;

  constructor(booksListService: IBooksListService) {
    this.booksListService = booksListService;
  }

  async execute(): Promise<IBooksListResponse | { message: string }> {
    const response = await this.booksListService.getBooksList();

    if (!response || response.data.length === 0) {
      return {
        message: "No books found.",
      };
    }

    return response;
  }
}

export default BooksListUseCase;
