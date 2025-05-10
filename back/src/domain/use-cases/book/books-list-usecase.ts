import { Book } from "@/domain/entities";
import { IBooksListService } from "@/domain/services";

class BooksListUseCase {
  booksListService: IBooksListService;

  constructor(booksListService: IBooksListService) {
    this.booksListService = booksListService;
  }

  async execute(): Promise<Book[] | { message: string }> {
    const booksList = await this.booksListService.getBooksList();

    if (!booksList || booksList.length === 0) {
      return {
        message: "No books found.",
      };
    }

    return booksList;
  }
}

export default BooksListUseCase;
